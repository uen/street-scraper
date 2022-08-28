import { IProperty } from "../interface/IProperty";
import { rightMoveApi } from "../service/rightmove-api";
import { ISearchParams } from "../interface/ISearchParams";

export interface ISearchResponse {
  properties: IProperty[];
  resultCount: Number;
}
// type b = Record<string, number> extends Object /

export const search = async (
  searchParams: ISearchParams
): Promise<ISearchResponse> => {
  const { status, data } = await rightMoveApi.get<ISearchResponse>(
    "api/_search",
    {
      params: {
        ...searchParams,
        propertyTypes: undefined,
        ...searchParams.propertyTypes?.reduce<Record<string, string>>(
          (encodedPropertyTypes, propertyType, index) => ({
            ...encodedPropertyTypes,
            [`propertyTypes${encodeURI(`${index}`)}`]: `${propertyType}`,
          }),
          {}
        ),
      },
    }
  );

  if (status === 200 && data) return data;

  console.error("Failed to execute search", status, data);
  throw new Error("Failed to execute search");
};
