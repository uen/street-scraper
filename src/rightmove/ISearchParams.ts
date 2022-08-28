export interface SearchParams {
    locationIdentifier: String,
    maxBedrooms: Number,
    minBedrooms: Number,
    maxPrice: Number,
    minPrice: Number,
    numberOfPropertiesPerPage: Number,
    radius: Number,
    // Sort enum
    sortType: 2,
    index: Number,
    propertyTypes: ["bungalow, detached", "flat", "semi-detached", "terraced"],
    viewType: "LIST",
    dontShow: ["houseShare", "student"],
    channel: "RENT",
    areaSizeUnit: "sqft",
    currencyCode: "GBP",
    isFetching: false,
    viewport: ""
}