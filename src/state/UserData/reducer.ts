import {
  UserDataState,
  UserDataActionTypes,
  UserDataActions,
  UpdateUsernameAction,
  UpdateMapStyleAction,
  InitUserDataAction,
  FirstLoginDataAction,
  MapStyleTypes,
} from "./types";

const initUserData: UserDataState = {
  username: "",
  preferedMapStyle: MapStyleTypes.STREET,
  userId: "",
  userIconSrc: "",
};

export const UserDataReducer = (
  state: UserDataState = initUserData,
  action: UserDataActions
): UserDataState => {
  switch (action.type) {
    case UserDataActionTypes.INIT_USER_DATA:
      return InitUserDataReducer(state, action);
    case UserDataActionTypes.UPDATE_USERNAME:
      return UsernameReducer(state, action);
    case UserDataActionTypes.UPDATE_MAP_STYLE:
      return MapStyleReducer(state, action);
    case UserDataActionTypes.FIRST_LOGIN_DATA:
      return FirstLoginDataReducer(state, action);
    case UserDataActionTypes.CLEAR_USER_DATA:
      return ClearUserDataReducer();
    default:
      return state;
  }
};

const InitUserDataReducer = (
  state: UserDataState,
  action: InitUserDataAction
): UserDataState => {
  return {
    ...state,
    ...action.payload.state,
  };
};

const FirstLoginDataReducer = (
  state: UserDataState,
  action: FirstLoginDataAction
): UserDataState => {
  return {
    ...state,
    ...action.payload.data,
    userId: action.payload.userId,
  };
};

const UsernameReducer = (
  state: UserDataState,
  action: UpdateUsernameAction
): UserDataState => {
  return {
    ...state,
    username: action.payload.username,
  };
};

const MapStyleReducer = (
  state: UserDataState,
  action: UpdateMapStyleAction
): UserDataState => {
  return {
    ...state,
    preferedMapStyle: action.payload.mapStyle,
  };
};

const ClearUserDataReducer = (): UserDataState => {
  return {
    ...initUserData,
  };
};
