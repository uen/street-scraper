import { IProperty } from "../rightmove";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import "dotenv/config";
import { APP_CONFIG } from "../../config";
import * as dayjs from "dayjs";
import { first } from "lodash";
import { IExportResult } from "./IExportResult";

const document = new GoogleSpreadsheet(process.env.SHEET_DOCUMENT_ID);

let rows: GoogleSpreadsheetRow[] = [];
let sheet: GoogleSpreadsheetWorksheet;

(async () => {
  await document.useServiceAccountAuth({
    client_email: process.env.SHEET_CLIENT_EMAIL ?? "",
    private_key: process.env.SHEET_CLIENT_PRIVATE_KEY ?? "",
  });
  await document.loadInfo();
  sheet = document.sheetsByIndex[0];
  rows = await sheet.getRows();
})();

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
  "Agent",
  "Contact",
];

export const rewriteHeader = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  sheet?.setHeaderRow(SHEET_HEADER);
};

export const handleExportSuitableProperty = async (
  property: IProperty,
  area: string = "Unknown",
  postcode: string
): Promise<IExportResult> => {
  // Get any rows that have the same ID as our property
  const matchedRows = await rows.filter((row) => {
    if (`${row.ID}` === `${property.id}`) {
      return true;
    }
  });

  if (matchedRows.length > 1) {
    console.warn(
      `${matchedRows.length} duplicates found for property ${property.displayAddress} (${property.id})`
    );
  }
  const existingRow = first(matchedRows);

  // If we have already written this property to the spreadsheet we should
  // update the row in-place, calculating the change in price (if any)
  if (existingRow) {
    const previousPrice = existingRow
      ? existingRow["PCM"].substring(1)
      : property.price.amount;

    let priceChange = existingRow
      ? +(
          ((property.price.amount - previousPrice) / previousPrice) *
          100
        ).toFixed(0)
      : 0;

    if (!priceChange && existingRow && existingRow["Price change"]) {
      priceChange = existingRow["Price change"]?.slice(0, -1);
    }

    // Update our existing property
    populateRow(property, area, existingRow, postcode, priceChange);

    if (APP_CONFIG.dryRun) {
      console.log(existingRow._rawData);
    } else {
      await existingRow.save();
    }

    return {
      isNew: false,
      percentageChange: priceChange,
      property,
    };
  } else {
    // Create a new row
    const newRow = new GoogleSpreadsheetRow(sheet, 999, {});
    populateRow(property, area, newRow, postcode);

    if (APP_CONFIG.dryRun) {
      console.log(newRow._rawData);
    } else {
      await sheet.addRow(newRow);
    }

    return {
      isNew: true,
      percentageChange: 0,
      property,
    };
  }
};

const populateRow = (
  property: IProperty,
  area: string,
  row: GoogleSpreadsheetRow,
  postcode: string,
  priceChange?: number
) => {
  row.ID = property.id;
  row.Address = property.displayAddress;
  row.Postcode = postcode;
  row.Area = area;
  row.Bedrooms = property.bedrooms ?? "Not specified";
  row.Bathrooms = property.bathrooms ?? "Not specified";
  row.Type = property.propertySubType;
  row.Link = `https://www.rightmove.co.uk${property.propertyUrl}`;
  row.PCM = property.price.amount;
  row["PCM/PP"] = Math.floor(property.price.amount / APP_CONFIG.peopleCount);
  row["Updated at"] = dayjs(property.listingUpdate.listingUpdateDate).format(
    "DD/MM/YYYY"
  );
  row["Price change"] = priceChange ? priceChange : "0%";
  row.Agent = property.customer.brandTradingName;
  row.Contact = property.customer.contactTelephone;
};
