import { IReducedProperty } from "../service/gdoc";
import { IProperty } from "../service/rightmove";

export const generateNewPropertyMessage = (newProperties: IProperty[]) => {
  return `
  @here
  **${newProperties.length} new properties were found!**


${newProperties
  .filter((property) => property.displayAddress)
  .map(
    (property, index) =>
      `**${index + 1}**. ${
        property.displayAddress
      } £${property.price.amount.toLocaleString()}\nhttps://www.rightmove.co.uk${
        property.propertyUrl
      }`
  )
  .join("\n\n")}
    `;
};

export const generateReducedPropertyMessage = (
  reducedProperties: IReducedProperty[]
) => {
  return `
    @here
    **${reducedProperties.length} reduced properties were found!**

    
    *${reducedProperties.length} reduced properties*
    ${reducedProperties
      .filter((reducedProperty) => reducedProperty.property.displayAddress)
      .map(
        (reducedProperty, index) =>
          `**${index + 1}**. ${
            reducedProperty.property.displayAddress
          } £${reducedProperty.property.price.amount.toLocaleString()} (${
            reducedProperty.percentageDifference
          }%)\nhttps://www.rightmove.co.uk${
            reducedProperty.property.propertyUrl
          }`
      )
      .join("\n\n")}
        `;
};
