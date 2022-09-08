import { IProperty } from "../rightmove";

export interface IExportResult {
  isNew: boolean;
  percentageChange: number;
  property: IProperty;
}
