import { IProperty } from "./interface/IProperty";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import "dotenv/config";
import { findPostcode } from "./util/postcode";
import { APP_CONFIG } from "./config";
import * as dayjs from "dayjs";
import { first } from "lodash";

const document = new GoogleSpreadsheet(process.env.SHEET_DOCUMENT_ID);

let rows: GoogleSpreadsheetRow[] = [];
let sheet: GoogleSpreadsheetWorksheet | null = null;
(async () => {
  await document.useServiceAccountAuth({
    client_email: process.env.SHEET_CLIENT_EMAIL ?? "",
    private_key: process.env.SHEET_CLIENT_PRIVATE_KEY ?? "",
  });
  await document.loadInfo();
  sheet = document.sheetsByIndex[0];
  rows = await sheet.getRows();
})();

export interface IPriceChangeProperty {
  percentageDifference: string;
  property: IProperty;
}

const SHEET_HEADER = [
  "ID",
  "Address",
  "Postcode",
  "Area",
  "Bedrooms",
  "Bathrooms",
  "Type",
  "Link",
  "PCM",
  "PCM/PP",
  "Updated at",
  "Price change",
];

export const rewriteHeader = async () => {
  sheet?.setHeaderRow(SHEET_HEADER);
};

export const handleExportSuitableProperty = async (
  property: IProperty,
  area: string = "Unknown"
): Promise<
  | {
      isNew?: boolean;
      percentageChange?: number;
      property: IProperty;
    }
  | undefined
> => {
  const matchedRows = await rows.filter((row) => {
    if (`${row.ID}` === `${property.id}`) {
      return true;
    }
  });

  for (const matchedRow of matchedRows) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    await matchedRow.delete();
  }

  const firstMatch = first(matchedRows);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const previousPrice = firstMatch
    ? firstMatch["PCM"].substring(1)
    : property.price.amount;

  let priceChange = firstMatch
    ? +(
        ((property.price.amount - previousPrice) / previousPrice) *
        100
      ).toFixed(0)
    : 0;

  if (!priceChange && firstMatch && firstMatch["Price change"]) {
    priceChange = firstMatch["Price change"].slice(0, -1);
  }

  await sheet?.addRow({
    Address: property.displayAddress,
    Postcode: findPostcode(property.displayAddress) ?? "",
    Area: area,
    Bedrooms: property.bedrooms,
    Bathrooms: property.bathrooms,
    "Updated at": dayjs(property.listingUpdate.listingUpdateDate).format(
      "DD/MM/YYYY"
    ),
    "Price change": priceChange ? `${priceChange}%` : "",
    Type: property.propertySubType,
    Link: `https://www.rightmove.co.uk${property.propertyUrl}`,
    PCM: `£${property.price.amount}`,
    ID: property.id,
    "PCM/PP": `£${Math.floor(property.price.amount / APP_CONFIG.peopleCount)}`,
  });

  if (firstMatch && priceChange <= -APP_CONFIG.notifyLowerPriceThreshold) {
    return {
      isNew: true,
      percentageChange: priceChange,
      property,
    };
  } else if (!firstMatch) {
    return {
      property,
    };
  }
};
