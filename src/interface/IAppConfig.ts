import { ISearchParams } from "./interface/ISearchParams";

type ConfigSearchParams = Omit<ISearchParams, "locationIdentifier">;

export interface IAppConfig {
  peopleCount: number;
  criteria: (ConfigSearchParams & {
    searchTerm: string;
  })[];
  defaultCriteria: ConfigSearchParams;
}
