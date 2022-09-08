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
      radius: 2.0,
    },
    {
      searchTerm: "Clapham Common",
      radius: 2.0,
    },
    {
      searchTerm: "Balham",
      radius: 1.5,
    },
    {
      searchTerm: "Putney",
      radius: 1.5,
    },
    {
      searchTerm: "Brixton",
      radius: 1.5,
    },
    {
      searchTerm: "Vauxhall",
      radius: 1.5,
    },
    {
      searchTerm: "Stockwell",
      radius: 1.5,
    },
    {
      searchTerm: "Peckham",
    },
    {
      searchTerm: "Battersea",
      radius: 1.5,
    },
    {
      searchTerm: "Wandsworth"
    },
    {
      searchTerm: "Tooting"
    },
    {
      searchTerm: "Tooting Bec"
    },
    {
      searchTerm: "East Dulwich"
    },
    {
      searchTerm: "Dulwich Village"
    },
    {
      searchTerm: "Camberwell"
    },
    {
      searchTerm: "Elephant and Castle"
    },
    {
      searchTerm: "Pimlico"
    },
    {
      searchTerm: "Lambeth"
    },
    {
      searchTerm: "Bermondsey"
    },
    {
      searchTerm: "Hammersmith"
    },
    {
      searchTerm: "Walworth"
    }
  ],
  defaultCriteria: {
    minBedrooms: 3,
    maxBedrooms: 5,
    minPrice: 500,
    maxPrice: 2900,
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
