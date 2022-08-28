import { IAppConfig } from "./interface/IAppConfig";

export const appConfig: IAppConfig = {
  peopleCount: 3,
  criteria: [
    {
      searchTerm: "Clapham Station",
      radius: 1.0,
    },
    {
      searchTerm: "Clapham North",
      radius: 1.0,
    },
    {
      searchTerm: "Clapham Common",
      radius: 1.0,
    },
    {
      searchTerm: "Putney",
      radius: 0.5
    },
    {
      searchTerm: "Brixton",
      radius: 0.5
    },
    {
      searchTerm: "Vauxhall",
      radius: 1.0
    },
    {
      searchTerm: "Stockwell",
      radius: 1.0
    },
    {
      searchTerm: "Peckham",
      radius: 0.5
    },
    {
      searchTerm: "Streatham",
      radius: 0.5
    }
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
    propertyTypes: ["bungalow", " detached", "flat", "semi-detached", "terraced"],
    viewType: "LIST",
    dontShow: ["houseShare", "student"],
    channel: "RENT",
    areaSizeUnit: "sqft",
    currencyCode: "GBP",
    isFetching: false,
    viewport: "",
  },
};
