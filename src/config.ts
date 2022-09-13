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
    locationIdentifier?: string;
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
      radius: 3.0,
    },
    {
      searchTerm: "Balham",
    },
    {
      searchTerm: "Putney",
    },
    {
      searchTerm: "Brixton",
    },
    {
      searchTerm: "Vauxhall",
      radius: 3.0,
    },
    {
      searchTerm: "Stockwell",
    },
    {
      searchTerm: "Peckham",
    },
    {
      searchTerm: "Battersea",
    },
    {
      searchTerm: "Wandsworth"
    },
    {
      searchTerm: "Tooting"
    },
    {
      searchTerm: "Tooting Bec Station"
    },
    {
      searchTerm: "East Dulwich"
    },
    {
      searchTerm: "West Dulwich South East London",
      locationIdentifier: "REGION^70448"
    },
    {
      searchTerm: "Dulwich Village",
    },
    {
      searchTerm: "Camberwell",
      locationIdentifier: "REGION^70440"
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
    },
    {
      searchTerm: "Streatham Hill"
    }
  ],
  defaultCriteria: {
    minBedrooms: 3,
    maxBedrooms: 5,
    minPrice: 500,
    maxPrice: 2900,
    numberOfPropertiesPerPage: 24,
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
