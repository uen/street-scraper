import { IAppConfig } from "./interface/IAppConfig";

export const APP_CONFIG: IAppConfig = {
  peopleCount: 3,
  notifyLowerPriceThreshold: 5,
  criteria: [
    {
      searchTerm: "Clapham Station",
      radius: 0.5,
    },
    {
      searchTerm: "Clapham North",
      radius: 0.5,
    },
    {
      searchTerm: "Clapham South",
      radius: 0.5,
    },
    {
      searchTerm: "Clapham Common",
      radius: 0.5,
    },
    {
      searchTerm: "Clapham Park",
      radius: 0.5,
    },
    {
      searchTerm: "Putney",
      radius: 0.5,
    },
    {
      searchTerm: "Brixton",
      radius: 0.5,
    },
    {
      searchTerm: "Vauxhall",
      radius: 0.5,
    },
    {
      searchTerm: "Stockwell",
      radius: 0.5,
    },
    {
      searchTerm: "Peckham",
      radius: 0.5,
    },
    {
      searchTerm: "Streatham",
      radius: 0.5,
    },
    {
      searchTerm: "Battersea",
      radius: 0.5,
    },
    {
      searchTerm: "Wandsworth",
      radius: 0.5,
    },
    {
      searchTerm: "Walworth",
      radius: 0.5,
    },
  ],
  defaultCriteria: {
    minBedrooms: 3,
    maxBedrooms: 4,
    minPrice: 1000,
    maxPrice: 2700,
    numberOfPropertiesPerPage: 50,
    radius: 1.0,
    // Sort enum
    sortType: 6,
    index: 0,
    propertyTypes: ["detached", "flat", "semi-detached", "terraced"],
    viewType: "LIST",
    dontShow: ["houseShare", "student"],
    channel: "RENT",
    areaSizeUnit: "sqft",
    currencyCode: "GBP",
    isFetching: false,
    viewport: "",
  },
};
