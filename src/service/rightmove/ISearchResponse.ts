import { IProperty } from "./IProperty";

export interface ISearchResponse {
    properties: IProperty[];
    resultCount: Number;
}