import { isEmpty } from "lodash";
import { APP_CONFIG } from "./config";
import { sendDiscordMessage } from "./discord";
import {
  handleExportSuitableProperty,
  IPriceChangeProperty,
  rewriteHeader,
} from "./export";
import { IProperty } from "./interface/IProperty";
import { sendNotification } from "./service/notiversal-api";
import { getRegionCode } from "./util/region-code";
import { search } from "./util/search";
import {
  generateNewPropertyMessage,
  generateReducedPropertyMessage,
} from "./util/text-generation";

(async () => {
  const resolvedCriteria = APP_CONFIG.criteria.map((criteria) => ({
    ...APP_CONFIG.defaultCriteria,
    ...criteria,
  }));

  const newProperties: IProperty[] = [];
  const reducedProperties: IPriceChangeProperty[] = [];

  const propertiesToAdd: { property: IProperty; searchTerm: string }[] = [];
  for (const criteria of resolvedCriteria) {
    const locationIdentifier = await getRegionCode(criteria.searchTerm);

    const searchParams = {
      ...criteria,
      locationIdentifier,
    };

    const searchResponse = await search(searchParams);

    for (const property of searchResponse.properties) {
      const propertyExist =
        propertiesToAdd.findIndex(
          ({ property: { id } }) => `${id}` === `${property.id}`
        ) !== -1;
      if (propertyExist) {
        console.warn(
          "Property already exists in batch",
          property.displayAddress
        );
        continue;
      }

      propertiesToAdd.push({ property, searchTerm: criteria.searchTerm });
    }
  }

  rewriteHeader();
  for (const { property, searchTerm } of propertiesToAdd) {
    console.log(`Exporting property ${property.displayAddress} to spreadsheet`);
    const listedProperty = await handleExportSuitableProperty(
      property,
      searchTerm
    );

    if (listedProperty && listedProperty.isNew) {
      console.log(
        `Reduced property: ${listedProperty.property.displayAddress} £${listedProperty.property.price.amount} (${listedProperty.percentageChange})`
      );
      reducedProperties.push({
        percentageDifference: `${listedProperty.percentageChange}`,
        property,
      });
    } else if (listedProperty) {
      console.log(
        `New property: ${listedProperty.property.displayAddress} £${listedProperty.property.price.amount}`
      );
      newProperties.push(listedProperty.property);
    }
  }

  if (!isEmpty(reducedProperties)) {
    const reducedPropertyMessage =
      generateReducedPropertyMessage(reducedProperties);
    const reducedPropertiesNotification = {
      event: "reduced-propery",
      title: "Reduced Properties",
      subtitle: "Properties matching your criteria have been reduced",
      actions: [
        {
          label: "View Properties",
          link: "https://app.notiversal.com",
        },
      ],
      body: reducedPropertyMessage,
    };

    console.log("Sending reduced property messages to discord");
    sendDiscordMessage(reducedPropertyMessage);
    console.log("Sending reduced property messages to notiversal");
    sendNotification(reducedPropertiesNotification);
  }

  if (!isEmpty(newProperties)) {
    const newPropertyMessage = generateNewPropertyMessage(newProperties);
    const newPropertyNotification = {
      event: "new-properties",
      title: "New Properties",
      subtitle: "Found new properties matching your criteria",
      actions: [
        {
          label: "View Properties",
          link: "https://app.notiversal.com",
        },
      ],
      body: newPropertyMessage,
    };

    console.log("Sending new property messages to discord");
    sendDiscordMessage(newPropertyMessage);
    console.log("Sending new property messages to notiversal");
    sendNotification(newPropertyNotification);
  }

  rewriteHeader();
  console.log("Done!");
})();
