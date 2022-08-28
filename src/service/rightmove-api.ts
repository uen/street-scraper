import axios from "axios";

export const rightMoveApi = axios.create({
  baseURL: `https://www.rightmove.co.uk/`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});
