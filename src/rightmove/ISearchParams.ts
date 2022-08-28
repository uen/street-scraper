export interface ISearchParams {
    locationIdentifier?: String,
    minBedrooms: Number,
    maxBedrooms: Number,
    minPrice: Number,
    maxPrice: Number,
    numberOfPropertiesPerPage: Number,
    radius: Number,
    // Sort enum
    sortType: Number,
    index: Number,
    propertyTypes: String[],
    viewType: String,
    dontShow: String[]
    channel: String ,
    areaSizeUnit: String,
    currencyCode: String,
    isFetching: boolean,
    viewport: String
}