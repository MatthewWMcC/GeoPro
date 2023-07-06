import { MapStyleTypes } from "state/UserData/types";

export interface IWikiModalData {
  title: string;
  link: string;
  summary: string;
  photourl: string;
}

export interface IGuestData {
  username: string;
  userId: string;
  preferedMapStyle: MapStyleTypes;
}

export enum LocalStorageItems {
  USERNAME = "LocalStorageItems/USERNAME",
  USER_ID = "LocalStorageItems/USER_ID",
  MAP_PREFERENCE = "LocalStorageItems/MAP_PREFERENCE",
}
