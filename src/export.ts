import { IRightMoveProperty } from "./rightmove/IRightMoveProperty";
import { GoogleSpreadsheet } from "google-spreadsheet";
import * as fs from "fs";
import "dotenv/config";

const document = new GoogleSpreadsheet(process.env.SHEET_DOCUMENT_ID);

(async () => {
  await document.useServiceAccountAuth({
    client_email: process.env.SHEET_CLIENT_EMAIL ?? "",
    private_key: process.env.SHEET_CLIENT_PRIVATE_KEY ?? "",
  });
})();

export const handleFindSuitableProperty = async (
  property: IRightMoveProperty,
  area: string = "Unknown"
) => {
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];

  const rows = await sheet.getRows();
  console.log(rows);

  const matchedRow = await rows.find((row) => {
    console.log(row.ID, property.id);
    if (`${row.ID}` === `${property.id}`) {
      return true;
    }
  });

  if (matchedRow) {
    await matchedRow.delete();
  }

  const PEOPLE = 3;
  await sheet.addRow({
    Postcode: "POSTCODE",
    Area: area,
    Beds: property.bedrooms,
    Bathrooms: property.bathrooms,
    Type: property.propertySubType,
    LINK: "http://pornhub.com",
    PCM: `${property.price.amount}`,
    ID: property.id,
    Furnished:
      property.furnishTypes?.map((option) => option.description).join(", ") ??
      "Unknown",
    "PCM/PP": property.price.amount / PEOPLE,
  });
};
