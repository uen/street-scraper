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
import { parseArea } from "./util/area";

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
    area: string;
  }[] = [];

  for (const criteria of resolvedCriteria) {
    const searchParams = {
      ...criteria,
    };


    const location = await getLocation(criteria.searchTerm);
    
    // If we have specified a location identifier in config
    // we should use that instead of the one derived from the search term
    if (criteria.locationIdentifier) {
      console.log(`Overriding location ${location.displayName} ${location.locationIdentifier} with ${criteria.searchTerm} ${criteria.locationIdentifier}`)
      location.displayName = criteria.searchTerm
      searchParams.locationIdentifier = criteria.locationIdentifier;
    } else {
      searchParams.locationIdentifier = location.locationIdentifier;
    }

    try {
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
          area: `${location.displayName} +${criteria.radius} miles`,
        });
      }
    } catch (error) {
      console.warn(
        `Search for ${criteria.searchTerm} failed`,
        searchParams,
        error
      );
    }
  }

  rewriteHeader();
  for (const { property, area } of propertiesToAdd) {
    // Attempt parse some information from the display address.
    const areaParseResult = parseArea(property.displayAddress, area);

    // If our display address matches any of our exclusions we should skip it
    if (areaParseResult.excluded) {
      console.log(`Excluded property: ${property.displayAddress}`);
      continue;
    }

    const propertyExportResult = await handleExportSuitableProperty(
      property,
      area,
      areaParseResult.postcode
    );

    if (propertyExportResult.isNew) {
      console.log(
        `New property: ${propertyExportResult.property.displayAddress} £${propertyExportResult.property.price.amount}, ${area}`
      );
      newProperties.push(propertyExportResult.property);
    } else if (
      !propertyExportResult.isNew &&
      propertyExportResult.percentageChange <=
        -APP_CONFIG.notifyLowerPriceThreshold
    ) {
      console.log(
        `Reduced property: ${propertyExportResult.property.displayAddress} £${propertyExportResult.property.price.amount}, ${area} (${propertyExportResult.percentageChange})`
      );
      reducedProperties.push({
        percentageDifference: `${propertyExportResult.percentageChange}`,
        property,
      });
    }

    // Wait between each spreadsheet operation
    await new Promise((res) => setTimeout(res, 1000));
  }
  rewriteHeader();

  if (APP_CONFIG.notify) {
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
  }

  console.log("Done!");
})();
