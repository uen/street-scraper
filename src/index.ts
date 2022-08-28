import { appConfig } from "./config";
import { getRegionCode } from "./util/region-code";
import { search } from "./util/search";

(async () => {
  const resolvedCriteria = appConfig.criteria.map((critera) => ({
    ...appConfig.defaultCriteria,
    ...critera,
  }));

  console.log(resolvedCriteria);

  for (const critera of resolvedCriteria) {
    console.log("Processing criteria", critera);

    const locationIdentifier = await getRegionCode(critera.searchTerm);

    console.log(`Got location identifier ${locationIdentifier}`);

    const searchParams = {
      ...critera,
      locationIdentifier,
    };
    console.log("Constructed search request", searchParams);
    const searchResponse = await search(searchParams);

    console.log("Got search response", searchResponse);
  }
})();
