import { chunk, first } from "lodash";
import axios from "axios";
import { rightMoveApi } from "../service/rightmove-api";

interface ILookAheadResponse {
  typeAheadLocations: {
    displayName: string;
    locationIdentifier: string;
    normalisedSearchTerm: string;
  }[];
}
export const getRegionCode = async (searchTerm: string): Promise<string> => {
  const searchChunks = chunk(searchTerm.toUpperCase().split(""), 2);
  const encodedChunks = searchChunks.map((chunk) =>
    chunk.map((letter) => encodeURI(letter))
  );

  const searchTerms = encodedChunks.map((chunk) => chunk.join("")).join("/");
  const { status, data } = await rightMoveApi.get<ILookAheadResponse>(
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
