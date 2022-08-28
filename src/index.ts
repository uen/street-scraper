import { handleFindSuitableProperty } from "./export";
import { getRegionCode } from "./rightmove/region-code";

console.log("hi");

console.log(getRegionCode("clapfuck shit"));

handleFindSuitableProperty({
  id: 126410567,
  bedrooms: 3,
  bathrooms: 1,
  numberOfImages: 8,
  numberOfFloorplans: 1,
  numberOfVirtualTours: 0,
  summary: "Newly refurbished three bedroom apartment in Nine Elms",
  displayAddress: "Vauxhall London SW8",
  countryCode: "GB",
  location: {
    latitude: 51.47899,
    longitude: -0.12808,
  },
  propertyImages: {
    images: [
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_00_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_00_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_01_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_01_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_02_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_02_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_03_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_03_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_04_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_04_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_05_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_05_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_06_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_06_0000.jpeg",
        caption: null,
      },
      {
        srcUrl:
          "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_07_0000_max_476x317.jpeg",
        url: "81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_07_0000.jpeg",
        caption: null,
      },
    ],
    mainImageSrc:
      "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_00_0000_max_476x317.jpeg",
    mainMapImageSrc:
      "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/81k/80340/126410567/80340_a1G4J00000262yzUAA_IMG_00_0000_max_296x197.jpeg",
  },
  propertySubType: "Apartment",
  listingUpdate: {
    listingUpdateReason: "new",
    listingUpdateDate: "2022-08-25T16:02:02Z",
  },
  premiumListing: true,
  featuredProperty: true,
  price: {
    amount: 2500,
    // frequency: "monthly",
    // currencyCode: "GBP",
    // displayPrices: [
    //   {
    //     displayPrice: "£2,500 pcm",
    //     displayPriceQualifier: "",
    //   },
    //   {
    //     displayPrice: "£577 pw",
    //     displayPriceQualifier: "",
    //   },
    // ],
  },
  customer: {
    branchId: 80340,
    brandPlusLogoURI: "/company/clogo_57104_0004.png",
    contactTelephone: "020 3834 8093",
    branchDisplayName: "Grainger Plc, South",
    branchName: "South",
    brandTradingName: "Grainger Plc",
    branchLandingPageUrl: "/estate-agents/agent/Grainger-Plc/South-80340.html",
    development: false,
    showReducedProperties: true,
    commercial: false,
    showOnMap: true,
    enhancedListing: false,
    developmentContent: null,
    buildToRent: true,
    buildToRentBenefits: [
      {
        id: 22,
        label: "Long term contracts",
        icon: "note",
        positionOnPage: 1,
      },
      {
        id: 18,
        label: "Flexible tenancies",
        icon: "note",
        positionOnPage: 2,
      },
      {
        id: 19,
        label: "Fully managed",
        icon: "seal-tick",
        positionOnPage: 3,
      },
      {
        id: 27,
        label: "Professional management",
        icon: "seal-tick",
        positionOnPage: 4,
      },
    ],
    brandPlusLogoUrl:
      "https://media.rightmove.co.uk:443/dir/company/clogo_57104_0004_max_100x50.png",
  },
  distance: 2.0712,
  transactionType: "rent",
  productLabel: {
    productLabelText: "Built for renters",
    spotlightLabel: false,
  },
  commercial: false,
  development: false,
  residential: true,
  students: false,
  auction: false,
  feesApply: true,
  feesApplyText: "asododa",
  displaySize: "",
  showOnMap: true,
  propertyUrl: "/properties/126410567#/?channel=RES_LET",
  contactUrl: "/property-to-rent/contactBranch.html?propertyId=126410567",
  staticMapUrl: null,
  channel: "RENT",
  firstVisibleDate: "2022-08-25T15:56:05Z",
  keywords: [],
  keywordMatchType: "no_keyword",
  saved: false,
  hidden: false,
  onlineViewingsAvailable: false,
  lozengeModel: {
    matchingLozenges: [
      {
        type: "BUILT_FOR_RENTERS",
        priority: 2,
      },
    ],
  },
  hasBrandPlus: true,
  displayStatus: "",
  heading: "Featured Property",
  propertyTypeFullDescription: "3 bedroom apartment",
  formattedBranchName: " by Grainger Plc, South",
  addedOrReduced: "Added on 25/08/2022",
  isRecent: false,
  formattedDistance: "2.07 miles",
  enhancedListing: false,
});
