import { APP_CONFIG } from "./config";
import { handleExportSuitableProperty, IPriceChangeProperty } from "./export";
import { IProperty } from "./interface/IProperty";
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

  console.log("PROPERTIES TO ADD:", propertiesToAdd);
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
  }

  console.log(
    "NOTIFY ABOUT NEW PROPERTIES:",
    priceLoweredProperties.map((a) => ({
      id: a.property.id,
      diff: a.percentageDifference,
    }))
  );

  console.log(
    "NOTIFY ABOUT NEW PROPERTIES",
    newProperties.map((a) => a.id).join(",")
  );
})();
