import { IGuestData, LocalStorageItems } from "global/types";
import { FirstLogin } from "state/UserData/actions";
import { MapStyleTypes } from "state/UserData/types";
import { store } from "state/store";
import { v4 as uuidv4 } from "uuid";
import { getGuestData } from "./helpers";
import { GuestLoggedInChange } from "state/AuthState/actions";

export const setNewGuestStorageData = (username: string) => {
  setUsername(username);
  setUserId();
  setDefaultMapboxStyle(MapStyleTypes.STREET);
};

const getGuestId = () => {
  return localStorage.getItem(LocalStorageItems.USER_ID);
};

export const getGuestStorageData = (): IGuestData => {
  return {
    userId: getGuestId() || uuidv4(),
    username: localStorage.getItem(LocalStorageItems.USERNAME) || "Guest_001",
    preferedMapStyle:
      (localStorage.getItem(
        LocalStorageItems.MAP_PREFERENCE
      ) as MapStyleTypes) || MapStyleTypes.STREET,
  };
};

const setUsername = (username: string) => {
  localStorage.setItem(LocalStorageItems.USERNAME, username);
};
const setUserId = () => {
  localStorage.setItem(LocalStorageItems.USER_ID, uuidv4());
};
export const setDefaultMapboxStyle = (style: MapStyleTypes) => {
  localStorage.setItem(LocalStorageItems.MAP_PREFERENCE, style);
};

export const guestLogOut = () => {
  localStorage.removeItem(LocalStorageItems.USERNAME);
  localStorage.removeItem(LocalStorageItems.USER_ID);
  localStorage.removeItem(LocalStorageItems.MAP_PREFERENCE);
  store.dispatch(GuestLoggedInChange(false));
};

const initLocalStorage = () => {
  const GuestData = getGuestStorageData();
  if (!!getGuestId()) {
    store.dispatch(FirstLogin(GuestData.userId, getGuestData(GuestData)));
    store.dispatch(GuestLoggedInChange(true));
  }
};

initLocalStorage();
