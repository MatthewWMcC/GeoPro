import { BASE_PROD_URL } from "./constants";

export const getRoomUrl = (roomId: string): string => {
  return BASE_PROD_URL + "room/" + roomId;
};
