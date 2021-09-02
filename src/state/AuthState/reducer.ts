import {
  AuthState,
  AuthStateActions,
  AuthStateActionTypes,
  LoadingUserType,
  LoggedInType,
  SetLogInPrevType,
} from "./types";

const initAuthState: AuthState = {
  loggedIn: false,
  logInPrevRoute: "/",
  loadingUser: true,
};

export const AuthStateReducer = (
  state: AuthState = initAuthState,
  action: AuthStateActionTypes
): AuthState => {
  switch (action.type) {
    case AuthStateActions.LOGGED_IN_CHANGE:
      return loggedInReducer(state, action);
    case AuthStateActions.LOG_IN_PREV_ROUTE:
      return setLogInPrevRouteReducer(state, action);
    case AuthStateActions.LOADING_USER:
      return loadingUserReducer(state, action);
    default:
      return state;
  }
};

const loggedInReducer = (state: AuthState, action: LoggedInType): AuthState => {
  return {
    ...state,
    loggedIn: action.payload.loggedIn,
    loadingUser: false,
  };
};

const setLogInPrevRouteReducer = (
  state: AuthState,
  action: SetLogInPrevType
): AuthState => {
  return {
    ...state,
    logInPrevRoute: action.payload.route,
  };
};

const loadingUserReducer = (
  state: AuthState,
  action: LoadingUserType
): AuthState => {
  return {
    ...state,
    loadingUser: action.payload.loading,
  };
};
