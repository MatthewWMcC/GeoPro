import { IGuestData } from "global/types";

export const getUserData = (data: any) => {
  return {
    userId: data.userId,
    username: data.username,
    preferedMapStyle: data.preferedMapStyle,
    userIconSrc: data.userIconSrc,
  };
};

export const getGuestData = (data: IGuestData) => {
  return {
    userId: data.userId,
    username: data.username,
    preferedMapStyle: data.preferedMapStyle,
  };
};
