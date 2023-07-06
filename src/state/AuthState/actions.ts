import {
  AuthStateActions,
  GuestLoggedInType,
  LoadingUserType,
  LoggedInType,
  SetLogInPrevType,
} from "./types";

export const LoggedInChange = (loggedIn: boolean): LoggedInType => {
  return {
    type: AuthStateActions.LOGGED_IN_CHANGE,
    payload: {
      loggedIn,
    },
  };
};

export const GuestLoggedInChange = (
  guestLoggedIn: boolean
): GuestLoggedInType => {
  return {
    type: AuthStateActions.GUEST_LOGGED_IN_CHANGE,
    payload: {
      guestLoggedIn,
    },
  };
};

export const SetLogInPrevRoute = (route: string): SetLogInPrevType => {
  return {
    type: AuthStateActions.LOG_IN_PREV_ROUTE,
    payload: {
      route,
    },
  };
};

export const LoadingUser = (loading: boolean): LoadingUserType => {
  return {
    type: AuthStateActions.LOADING_USER,
    payload: {
      loading,
    },
  };
};
