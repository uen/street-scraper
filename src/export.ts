import { IProperty } from "./interface/IProperty";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import * as fs from "fs";
import "dotenv/config";
import { findPostcode } from "./util/postcode";
import { APP_CONFIG } from "./config";
import * as dayjs from "dayjs";

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
  const matchedRow = await rows.find((row) => {
    if (`${row.ID}` === `${property.id}`) {
      return true;
    }
  });

  if (matchedRow) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await matchedRow.delete();
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  // console.warn("Found postcode", findPostcode(property.displayAddress));
  // console.log("FUNSIHED TYPE:|", property.furnishTypes);

  console.log(
    "MATCHED ROW:",
    !!matchedRow,
    matchedRow ? matchedRow["PCM"].substring(1) : "NONE",
    property.price.amount
  );
  const previousPrice = matchedRow
    ? matchedRow["PCM"].substring(1)
    : property.price.amount;
  const priceChange = matchedRow
    ? +(
        ((property.price.amount - previousPrice) / previousPrice) *
        100
      ).toFixed(0)
    : 0;

  await sheet?.addRow({
    Postcode: findPostcode(property.displayAddress) ?? "",
    Area: area,
    Beds: property.bedrooms,
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

  if (matchedRow && priceChange <= -APP_CONFIG.notifyLowerPriceThreshold) {
    return {
      isNew: true,
      percentageChange: priceChange,
      property,
    };
  } else if (!matchedRow) {
    return {
      property,
    };
  }
};
