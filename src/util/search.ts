import { IProperty } from "../interface/IProperty";
import { rightMoveApi } from "../service/rightmove-api";
import { ISearchParams } from "../interface/ISearchParams";

export interface ISearchResponse {
  properties: IProperty[];
  resultCount: Number;
}

export const search = async (
  searchParams: ISearchParams
): Promise<ISearchResponse> => {
  const { status, data } = await rightMoveApi.get<ISearchResponse>(
    "api/_search",
    {
      params: { ...searchParams },
    }
  );

  if (status === 200 && data) return data;

  console.error("Failed to execute search", status, data);
  throw new Error("Failed to execute search");
};
