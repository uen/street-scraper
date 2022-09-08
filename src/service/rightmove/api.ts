import axios from "axios";
import { chunk, first } from "lodash";
import { ILookAheadResponse } from "./ILookAheadResponse";
import { ISearchParams } from "./ISearchParams";
import { ISearchResponse } from "./ISearchResponse";

const api = axios.create({
  baseURL: `https://www.rightmove.co.uk/`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

const mapToRequestArray = (
  type: string,
  data?: string[]
): Record<string, string> => {
  if (!data) return {};

  return data?.reduce<Record<string, string>>(
    (encodedPropertyTypes, propertyType, index) => ({
      ...encodedPropertyTypes,
      [`${type}${encodeURI(`[${index}]`)}`]: `${propertyType}`,
    }),
    {}
  );
};

export const getRegionCode = async (searchTerm: string): Promise<string> => {
  const searchChunks = chunk(searchTerm.toUpperCase().split(""), 2);
  const encodedChunks = searchChunks.map((chunk) =>
    chunk.map((letter) => encodeURI(letter))
  );

  const searchTerms = encodedChunks.map((chunk) => chunk.join("")).join("/");
  const { status, data } = await api.get<ILookAheadResponse>(
    `typeAhead/uknostreet/${searchTerms}`
  );

  const locationIdentifier = first(
    data?.typeAheadLocations
  )?.locationIdentifier;
  if (status === 200 && locationIdentifier) {
    return locationIdentifier;
  }

  throw new Error(`Could not get region code from string: ${searchTerm}`);
};

export const search = async (
  searchParams: ISearchParams
): Promise<ISearchResponse> => {
  const params = {
    params: {
      ...searchParams,
      propertyTypes: undefined,
      dontShow: undefined,
      ...mapToRequestArray("propertyTypes", searchParams.propertyTypes),
      ...mapToRequestArray("dontShow", searchParams.dontShow),
      locationIdentifier: searchParams.locationIdentifier,
    },
  };
  const { status, data } = await api.get<ISearchResponse>(
    "api/_search",
    { params: params.params }
  );

  if (status === 200 && data) return data;

  console.error("Failed to execute search", status, data);
  throw new Error("Failed to execute search");
};