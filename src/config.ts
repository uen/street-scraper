import { ISearchParams } from "./service/rightmove";
import "dotenv/config";

type ConfigSearchParams = Omit<ISearchParams, "locationIdentifier">;

interface IAppConfig {
  dryRun: boolean;
  notify: boolean;
  peopleCount: number;
  notifyLowerPriceThreshold: number;
  criteria: (ConfigSearchParams & {
    searchTerm: string;
  })[];
  defaultCriteria: ConfigSearchParams;
}

export const APP_CONFIG: IAppConfig = {
  // Default to false if not set
  dryRun: process.env.DRY_RUN === "true" ? true : false,
  // Default to true if not set
  notify: process.env.NOTIFY === "false" ? false : true,
  peopleCount: 3,
  notifyLowerPriceThreshold: 5,
  criteria: [
    {
      searchTerm: "Clapham",
      radius: 1.5,
    },
    {
      searchTerm: "Clapham Common",
      radius: 0.5,
    },
    {
      searchTerm: "Balham",
      radius: 0.5,
    },
    {
      searchTerm: "Putney",
      radius: 1.0,
    },
    {
      searchTerm: "Brixton",
      radius: 1.0,
    },
    {
      searchTerm: "Vauxhall",
      radius: 1.0,
    },
    {
      searchTerm: "Stockwell",
      radius: 1.0,
    },
    {
      searchTerm: "Peckham",
      radius: 0.5,
    },
    {
      searchTerm: "Battersea",
      radius: 1.0,
    },
    {
      searchTerm: "Wandsworth",
      radius: 0.5,
    },
    {
      searchTerm: "Tooting",
      radius: 0.5,
    },
    {
      searchTerm: "East Dulwich",
      radius: 0.5,
    },
    {
      searchTerm: "Camberwell",
      radius: 0.5,
    }
  ],
  defaultCriteria: {
    minBedrooms: 3,
    maxBedrooms: 4,
    minPrice: 1000,
    maxPrice: 2700,
    numberOfPropertiesPerPage: 50,
    radius: 3.0,
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
