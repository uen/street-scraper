import { IAppConfig } from "./IAppConfig";
import { ISearchParams } from "./rightmove/ISearchParams";

export const appConfig: IAppConfig = {
    criteria: [],
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
        viewport: ""
    }
}
