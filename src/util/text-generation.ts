import { IPriceChangeProperty } from "../export";
import { IProperty } from "../interface/IProperty";

export const generateNewPropertyMessage = (newProperties: IProperty[]) => {
  return `
**New Properties**
*${newProperties.length} new properties*
${newProperties
  .filter((property) => property.displayAddress)
  .map(
    (property, index) =>
      `${index}. ${property.displayAddress} ${property.price.amount}\n${property.propertyUrl}`
  )
  .join("\n")}
    `;
};

export const generateReducedPropertyMessage = (
  reducedProperties: IPriceChangeProperty[]
) => {
  return `
    **Reduced Properties**
    *${reducedProperties.length} reduced properties*
    ${reducedProperties
      .filter((reducedProperty) => reducedProperty.property.displayAddress)
      .map(
        (reducedProperty, index) =>
          `${index}. ${reducedProperty.property.displayAddress} ${reducedProperty.property.price.amount} (${reducedProperty.percentageDifference})\n${reducedProperty.property.propertyUrl}`
      )
      .join("\n")}
        `;
};
