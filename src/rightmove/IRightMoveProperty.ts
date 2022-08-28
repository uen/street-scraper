export interface IRightMoveProperty {
  id: number;
  bedrooms: number;
  bathrooms: number;
  numberOfImages: number;
  numberOfFloorplans: number;
  numberOfVirtualTours: number;
  summary: string;
  displayAddress: string;
  countryCode: string;
  location: Location;
  propertyImages: PropertyImages;
  propertySubType: string;
  listingUpdate: ListingUpdate;
  premiumListing: boolean;
  featuredProperty: boolean;
  price: {
    amount: number;
  };
  customer: Customer;
  distance: number;
  transactionType: string;
  productLabel: ProductLabel;
  commercial: boolean;
  development: boolean;
  residential: boolean;
  students: boolean;
  auction: boolean;
  feesApply: boolean;
  feesApplyText: string;
  displaySize: string;
  showOnMap: boolean;
  propertyUrl: string;
  contactUrl: string;
  staticMapUrl: any;
  channel: string;
  firstVisibleDate: string;
  keywords: any[];
  keywordMatchType: string;
  saved: boolean;
  hidden: boolean;
  onlineViewingsAvailable: boolean;
  lozengeModel: LozengeModel;
  hasBrandPlus: boolean;
  displayStatus: string;
  enhancedListing: boolean;
  propertyTypeFullDescription: string;
  formattedBranchName: string;
  addedOrReduced: string;
  isRecent: boolean;
  formattedDistance: string;
  heading: string;
  furnishTypes?: {
    value: string;
    description: string;
  }[];
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface PropertyImages {
  images: Image[];
  mainImageSrc: string;
  mainMapImageSrc: string;
}

export interface Image {
  srcUrl: string;
  url: string;
  caption: any;
}

export interface ListingUpdate {
  listingUpdateReason: string;
  listingUpdateDate: string;
}

export interface Price {
  amount: number;
  frequency: string;
  currencyCode: string;
  displayPrices: DisplayPrice[];
}

export interface DisplayPrice {
  displayPrice: string;
  displayPriceQualifier: string;
}

export interface Customer {
  branchId: number;
  brandPlusLogoURI: string;
  contactTelephone: string;
  branchDisplayName: string;
  branchName: string;
  brandTradingName: string;
  branchLandingPageUrl: string;
  development: boolean;
  showReducedProperties: boolean;
  commercial: boolean;
  showOnMap: boolean;
  enhancedListing: boolean;
  developmentContent: any;
  buildToRent: boolean;
  buildToRentBenefits: any[];
  brandPlusLogoUrl: string;
}

export interface ProductLabel {
  productLabelText: string;
  spotlightLabel: boolean;
}

export interface LozengeModel {
  matchingLozenges: any[];
}
