import { first } from "lodash";

const POSTCODE_REGEX = /[a-zA-Z]{1,2}\d{1,2}(?:\s\d[a-zA-Z]{2})?/;

export const findPostcode = (address: string): string | undefined => {
  const postcode = first(address.match(POSTCODE_REGEX));
  console.log("Finding postcode for address: ", { address, postcode });
  return postcode ? postcode.toUpperCase() : postcode;
};
