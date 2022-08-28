import { ISearchParams } from "./rightmove/ISearchParams"

export interface IAppConfig {
    criteria: ISearchParams[]
    defaultCriteria: ISearchParams
}