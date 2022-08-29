import axios from "axios";
import { isEmpty } from "lodash";
import { APP_CONFIG } from "./config";
import { handleExportSuitableProperty, IPriceChangeProperty } from "./export";
import { IProperty } from "./interface/IProperty";
import { sendNotification } from "./service/notiversal-api";
import { getRegionCode } from "./util/region-code";
import { search } from "./util/search";

(async () => {
  const resolvedCriteria = APP_CONFIG.criteria.map((criteria) => ({
    ...APP_CONFIG.defaultCriteria,
    ...criteria,
  }));

  const newProperties: IProperty[] = [];
  const priceLoweredProperties: IPriceChangeProperty[] = [];

  const propertiesToAdd: { property: IProperty; searchTerm: string }[] = [];
  for (const criteria of resolvedCriteria) {
    console.log("Processing criteria", criteria);

    const locationIdentifier = await getRegionCode(criteria.searchTerm);
    console.log(`Got location identifier ${locationIdentifier}`);

    const searchParams = {
      ...criteria,
      locationIdentifier,
    };

    const searchResponse = await search(searchParams);

    console.log("Search response", searchResponse);
    for (const property of searchResponse.properties) {
      const propertyExist =
        propertiesToAdd.findIndex(
          ({ property: { id } }) => `${id}` === `${property.id}`
        ) !== -1;
      if (propertyExist) {
        console.warn("Property already exists", property.displayAddress);
        continue;
      }

      propertiesToAdd.push({ property, searchTerm: criteria.searchTerm });
    }
  }

  for (const { property, searchTerm } of propertiesToAdd) {
    const listedProperty = await handleExportSuitableProperty(
      property,
      searchTerm
    );

    if (listedProperty && listedProperty.isNew) {
      priceLoweredProperties.push({
        percentageDifference: `${listedProperty.percentageChange}`,
        property,
      });
    } else if (listedProperty) {
      newProperties.push(listedProperty.property);
    }
    newProperties.push(property)
  }

  if (!isEmpty(priceLoweredProperties)) {
    console.log(
      "Reduced property:",
      priceLoweredProperties.map((a) => ({
        id: a.property.id,
        diff: a.percentageDifference,
      }))
    );

    const priceLoweredPropertiesNotification = {
      event: "reduced-propery",
      title: "Reduced Properties",
      subtitle: "Properties matching your criteria have been reduced",
      actions: [
        {
          label: "View Properties",
          link: "https://app.notiversal.com"
        }
      ],
      body: `
  *Reduced Properties*
  ** ${priceLoweredProperties.length} reduced properties
  ${priceLoweredProperties
          .filter(reducedProperty => reducedProperty.property.displayAddress)
          .map((reducedProperty, index) => `${index}. ${reducedProperty.property.displayAddress} ${reducedProperty.property.price.amount} (${reducedProperty.percentageDifference})`)
          .join("\n")}
      `
    }

    sendNotification(priceLoweredPropertiesNotification);
  }


  if (!isEmpty(newProperties)) {
    console.log(
      "New properties",
      newProperties.map((a) => a.id).join(",")
    );

    const newPropertyNotification = {
      event: "new-properties",
      title: "New Properties",
      subtitle: "Found new properties matching your criteria",
      actions: [
        {
          label: "View Properties",
          link: "https://app.notiversal.com"
        }
      ],
      body: `
  *New Properties*
  ** ${newProperties.length} new properties
  ${newProperties
          .filter(property => property.displayAddress)
          .map((property, index) => `${index}. ${property.displayAddress} ${property.price.amount}`)
          .join("\n")}
      `
    }

    sendNotification(newPropertyNotification);
  }
})();
