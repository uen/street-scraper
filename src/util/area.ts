import { first } from "lodash";

const POSTCODE_REGEX = /\w{1,2}\d{1,2}(?:\s?\d\w{2})?/i;

// https://regex101.com/r/eW6qEu/1
const POSTCODE_INCLUDE_REGEX = /(?:N|SW|SE|E|W)\d{1,2}(?:\s?\d\w{2})?/i;
const AREA_EXCLUDE_REGEX = /surrey|croydon|twickenham|kingston|camberley/i;

export const parseArea = (
  address: string,
  location: string
): {
  excluded: boolean;
  postcode: string;
} => {
  const postcode = first(address.match(POSTCODE_REGEX))?.toUpperCase();

  if (postcode && !postcode.match(POSTCODE_INCLUDE_REGEX)) {
      return {
        excluded: true,
        postcode
      }
  }

  if (location.match(AREA_EXCLUDE_REGEX) || address.match(AREA_EXCLUDE_REGEX)) {
    return {
      excluded: true,
      postcode: postcode ?? ""
    }
  }

  return {
    excluded: false,
    postcode: postcode ?? ""
  }
};
