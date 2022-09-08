import { isEmpty } from "lodash";
import { APP_CONFIG } from "./config";
import {
  handleExportSuitableProperty,
  IReducedProperty,
  rewriteHeader,
} from "./service/gdoc";
import { sendNotification } from "./service/notiversal";
import { sendDiscordMessage } from "./service/discord";
import { search, getLocation, IProperty } from "./service/rightmove";
import {
  generateNewPropertyMessage,
  generateReducedPropertyMessage,
} from "./util/text-generation";
import { findPostcode } from "./util/postcode";

(async () => {
  console.log("Starting Street-Scraper...\n", APP_CONFIG);

  if (APP_CONFIG.dryRun) {
    console.warn("Dry run is enabled!");
  }

  const resolvedCriteria = APP_CONFIG.criteria.map((criteria) => ({
    ...APP_CONFIG.defaultCriteria,
    ...criteria,
  }));

  const newProperties: IProperty[] = [];
  const reducedProperties: IReducedProperty[] = [];

  const propertiesToAdd: {
    property: IProperty;
    locationDisplayName: string;
  }[] = [];

  for (const criteria of resolvedCriteria) {
    const location = await getLocation(criteria.searchTerm);

    const searchParams = {
      ...criteria,
      locationIdentifier: location.locationIdentifier,
    };

    const searchResponse = await search(searchParams);

    for (const property of searchResponse.properties) {
      const propertyExist =
        propertiesToAdd.findIndex(
          ({ property: { id } }) => `${id}` === `${property.id}`
        ) !== -1;
      if (propertyExist) {
        // If we have already found this property we
        // don't need to process it again
        continue;
      }

      propertiesToAdd.push({
        property: property,
        locationDisplayName: location.displayName,
      });
    }
  }

  rewriteHeader();
  for (const { property, locationDisplayName } of propertiesToAdd) {
    // Attempt to get a postcode for the property from its display address.
    const postcodeResult = findPostcode(property.displayAddress);

    // If our postcode is excluded we can skip this property
    if (postcodeResult.excluded) {
      console.log(
        `Property ${property.displayAddress} has been excluded by postcode ${postcodeResult.postcode}`
      );
      continue;
    }

    const propertyExportResult = await handleExportSuitableProperty(
      property,
      locationDisplayName,
      postcodeResult.postcode
    );

    if (propertyExportResult.isNew) {
      console.log(
        `New property: ${propertyExportResult.property.displayAddress} £${propertyExportResult.property.price.amount}, ${locationDisplayName}`
      );
      newProperties.push(propertyExportResult.property);
    } else if (
      !propertyExportResult.isNew &&
      propertyExportResult.percentageChange <=
        -APP_CONFIG.notifyLowerPriceThreshold
    ) {
      console.log(
        `Reduced property: ${propertyExportResult.property.displayAddress} £${propertyExportResult.property.price.amount}, ${locationDisplayName} (${propertyExportResult.percentageChange})`
      );
      reducedProperties.push({
        percentageDifference: `${propertyExportResult.percentageChange}`,
        property,
      });
    }

    // Wait between each operation
    await new Promise((res) => setTimeout(res, 1000));
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

    sendDiscordMessage(reducedPropertyMessage);
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

    sendDiscordMessage(newPropertyMessage);
    sendNotification(newPropertyNotification);
  }

  rewriteHeader();
  console.log("Done!");
})();
