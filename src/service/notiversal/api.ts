import axios from "axios";
import { APP_CONFIG } from "../../config";
import { INotification } from "./INotification";

const notiversalApi = axios.create({
  baseURL: `https://www.rightmove.co.uk/`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

export const sendNotification = async (notification: INotification) => {
  if (!APP_CONFIG.dryRun) {
    await notiversalApi.post(
      "https://api.notiversal.com/notify",
      notification,
      {
        headers: {
          "api-key": process.env.NOTIVERSAL_API_KEY ?? "",
        },
      }
    );
  }
};
