export interface ISearchParams {
  locationIdentifier?: string;
  minBedrooms?: Number;
  maxBedrooms?: Number;
  minPrice?: Number;
  maxPrice?: Number;
  numberOfPropertiesPerPage?: Number;
  radius?: Number;
  // TODO: Sort enum
  sortType?: Number;
  index?: Number;
  propertyTypes?: string[];
  viewType?: string;
  dontShow?: string[];
  channel?: string;
  areaSizeUnit?: string;
  currencyCode?: string;
  isFetching?: boolean;
  viewport?: string;
}
