import axios from "axios";

export const notiversalApi = axios.create({
  baseURL: `https://www.rightmove.co.uk/`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

export interface INotification {
  event: string;
  title: string;
  subtitle: string;
  actions: {
    label: string;
    link: string;
  }[];
  body: string;
}

export const sendNotification = async (notification: INotification) => {
  const response = await notiversalApi.post(
    "https://api.notiversal.com/notify",
    notification,
    {
      headers: {
        "api-key": process.env.NOTIVERSAL_API_KEY ?? "",
      },
    }
  );
};
