import { first } from "lodash";

const POSTCODE_REGEX = /[a-zA-Z]{1,2}\d{1,2}(?:\s\d[a-zA-Z]{2})?/;
const POSTCODE_EXCLUDE_REGEX = /CR{1,2}\d{1,2}(?:\s\d[a-zA-Z]{2})?/;


export const findPostcode = (address: string): {
  excluded: boolean,
  postcode: string
} => {

  const postcode = first(address.match(POSTCODE_REGEX))?.toUpperCase();

  if (postcode?.match(POSTCODE_EXCLUDE_REGEX)) {
    return {
      excluded: true,
      postcode
    }
  } else {
    return {
      excluded: false,
      postcode: postcode ? postcode : ""
    }
  }
};
