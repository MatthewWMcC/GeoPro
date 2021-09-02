import {
  UpdateUsernameAction,
  UpdateMapStyleAction,
  UserDataActionTypes,
  UserDataState,
  InitUserDataAction,
  FirstLoginDataAction,
  MapStyleTypes,
  ClearUserDataAction,
} from "./types";

export const ClearUserData = (): ClearUserDataAction => {
  return {
    type: UserDataActionTypes.CLEAR_USER_DATA,
    payload: {},
  };
};

export const InitUserData = (state: UserDataState): InitUserDataAction => {
  return {
    type: UserDataActionTypes.INIT_USER_DATA,
    payload: {
      state,
    },
  };
};

export const UpdateUsername = (username: string): UpdateUsernameAction => {
  return {
    type: UserDataActionTypes.UPDATE_USERNAME,
    payload: {
      username,
    },
  };
};
export const UpdateMapStyle = (
  mapStyle: MapStyleTypes
): UpdateMapStyleAction => {
  return {
    type: UserDataActionTypes.UPDATE_MAP_STYLE,
    payload: {
      mapStyle,
    },
  };
};

export const FirstLogin = (
  userId: string,
  data?: any
): FirstLoginDataAction => {
  return {
    type: UserDataActionTypes.FIRST_LOGIN_DATA,
    payload: {
      userId,
      data,
    },
  };
};
