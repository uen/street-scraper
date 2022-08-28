import { chunk, first } from "lodash";
import axios from "axios";
import { rightMoveApi } from "./rightmove/api";

export const getRegionCode = async (searchTerm: string) => {
  // typeAhead/uknostreet/CL/AP/HA/M%20/CO/MM/ON/
  console.log(searchTerm.split(""));
  const searchChunks = chunk(searchTerm.toUpperCase().split(""), 2);
  console.log(searchChunks);
  const encodedChunks = searchChunks.map((chunk) =>
    chunk.map((letter) => encodeURI(letter))
  );

  console.log(searchChunks, encodedChunks);

  const searchTerms = encodedChunks.map((chunk) => chunk.join("")).join("/");
  console.log(searchTerms);
  // console.log(`typeAhead/uknostreet/${encodedChunks.join("/")}`);

  const { status, data } = await rightMoveApi.get(
    `typeAhead/uknostreet/${searchTerms}`
  );

  if (status === 200) {
    return data;
  }

  throw new Error(`Could not get region code from string: ${searchTerm}`);
};
