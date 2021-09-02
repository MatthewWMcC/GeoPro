export interface UserDataState {
  username: string;
  preferedMapStyle: MapStyleTypes;
  userId: string;
  userIconSrc: string;
}

export interface ClearUserDataAction {
  type: UserDataActionTypes.CLEAR_USER_DATA;
  payload: {};
}

export interface InitUserDataAction {
  type: UserDataActionTypes.INIT_USER_DATA;
  payload: {
    state: UserDataState;
  };
}

export interface FirstLoginDataAction {
  type: UserDataActionTypes.FIRST_LOGIN_DATA;
  payload: {
    userId: string;
    data?: any;
  };
}

export interface UpdateUsernameAction {
  type: UserDataActionTypes.UPDATE_USERNAME;
  payload: {
    username: string;
  };
}

export interface UpdateMapStyleAction {
  type: UserDataActionTypes.UPDATE_MAP_STYLE;
  payload: {
    mapStyle: MapStyleTypes;
  };
}

export enum UserDataActionTypes {
  INIT_USER_DATA = "userDataAction/INIT_USER_DATA",
  UPDATE_USERNAME = "userDataAction/UPDATE_USERNAME",
  UPDATE_MAP_STYLE = "userDataAction/UPDATE_MAP_STYLE",
  FIRST_LOGIN_DATA = "userDataAction/FIRST_LOGIN_DATA",
  CLEAR_USER_DATA = "userDataAction/CLEAR_USER_DATA",
}

export type UserDataActions =
  | UpdateUsernameAction
  | UpdateMapStyleAction
  | InitUserDataAction
  | FirstLoginDataAction
  | ClearUserDataAction;

//----------map types

export enum MapStyleTypes {
  DARK = "MapStyle/DARK",
  LIGHT = "MapStyle/LIGHT",
  STREET = "MapStyle/STREET",
}

export const MapStyles = {
  "MapStyle/DARK": {
    withBorders:
      "mapbox://styles/matthewmccracken/ckq8q35kr1f5x17o9f6wom6b7?optimize=true",
    withoutBorders:
      "mapbox://styles/matthewmccracken/ckq8r6yy05fm617nssmdvo9ul",
    labels: "mapbox://styles/matthewmccracken/ckrjs42wg0yqx17rwazjmvq2i",
  },
  "MapStyle/LIGHT": {
    withBorders:
      "mapbox://styles/matthewmccracken/ckqe6wn960vt717qa57ns25os?optimize=true",
    withoutBorders:
      "mapbox://styles/matthewmccracken/ckqe6xvh36q2u17n2t6789h8y",
    labels: "mapbox://styles/matthewmccracken/ckrjs42wg0yqx17rwazjmvq2i",
  },
  "MapStyle/STREET": {
    withBorders: "mapbox://styles/matthewmccracken/ckqo7kkoj1oad18mf8pu411yd",
    withoutBorders:
      "mapbox://styles/matthewmccracken/ckqo8aw8x3lz218pab65f7ipb",
    labels: "mapbox://styles/matthewmccracken/ckrjs42wg0yqx17rwazjmvq2i",
  },
};

//----------------------
