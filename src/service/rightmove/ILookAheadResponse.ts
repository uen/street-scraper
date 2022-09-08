export interface ILookAheadResponse {
    typeAheadLocations: ILookAheadLocation[];
}

export interface ILookAheadLocation {
    displayName: string;
    locationIdentifier: string;
    normalisedSearchTerm: string;
}