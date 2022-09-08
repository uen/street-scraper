export interface ILookAheadResponse {
    typeAheadLocations: {
        displayName: string;
        locationIdentifier: string;
        normalisedSearchTerm: string;
    }[];
}