import { IProperty } from "../interface/IProperty";
import { rightMoveApi } from "../service/rightmove-api";
import { ISearchParams } from "../interface/ISearchParams";

export interface ISearchResponse {
  properties: IProperty[];
  resultCount: Number;
}

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
  const { status, data } = await rightMoveApi.get<ISearchResponse>(
    "api/_search",
    { params: params.params }
  );

  if (status === 200 && data) return data;

  console.error("Failed to execute search", status, data);
  throw new Error("Failed to execute search");
};
