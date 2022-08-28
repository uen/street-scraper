import { IAppConfig } from "./interface/IAppConfig";

export const appConfig: IAppConfig = {
  peopleCount: 3,
  criteria: [
    {
      searchTerm: "Clapham",
      radius: 2.0,
    },
  ],
  defaultCriteria: {
    minBedrooms: 3,
    maxBedrooms: 4,
    minPrice: 1000,
    maxPrice: 2700,
    numberOfPropertiesPerPage: 24,
    radius: 1.0,
    // Sort enum
    sortType: 2,
    index: 0,
    propertyTypes: ["bungalow, detached", "flat", "semi-detached", "terraced"],
    viewType: "LIST",
    dontShow: ["houseShare", "student"],
    channel: "RENT",
    areaSizeUnit: "sqft",
    currencyCode: "GBP",
    isFetching: false,
    viewport: "",
  },
};
