import { first } from "lodash";

const POSTCODE_REGEX = /[a-zA-Z]{1,2}\d{1,2}(?:\s\d[a-zA-Z]{2})?/;

// https://regex101.com/r/KhxTN3/1
const POSTCODE_EXCLUDE_REGEX = /(?:CR|GU|TW)\d{1,2}(?:\s\d[a-zA-Z]{2})?/i;
const AREA_EXCLUDE_REGEX = /surrey|croydon|twickenham|kingston|camberley/i;

export const parseArea = (
  address: string,
  location: string
): {
  excluded: boolean;
  postcode: string;
} => {
  const postcode = first(address.match(POSTCODE_REGEX))?.toUpperCase();

  if (
    postcode?.match(POSTCODE_EXCLUDE_REGEX) ||
    address.match(AREA_EXCLUDE_REGEX) ||
    location.match(AREA_EXCLUDE_REGEX)
  ) {
    return {
      excluded: true,
      postcode: postcode ? postcode : "",
    };
  } else {
    return {
      excluded: false,
      postcode: postcode ? postcode : "",
    };
  }
};
