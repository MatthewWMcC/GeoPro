export interface AuthState {
  loggedIn: boolean;
  logInPrevRoute: string;
  loadingUser: boolean;
}

export interface LoggedInType {
  type: AuthStateActions.LOGGED_IN_CHANGE;
  payload: {
    loggedIn: boolean;
  };
}

export interface SetLogInPrevType {
  type: AuthStateActions.LOG_IN_PREV_ROUTE;
  payload: {
    route: string;
  };
}

export interface LoadingUserType {
  type: AuthStateActions.LOADING_USER;
  payload: {
    loading: boolean;
  };
}

export enum AuthStateActions {
  LOGGED_IN_CHANGE = "AuthStateActions/LOGGED_IN_CHANGE",
  LOG_IN_PREV_ROUTE = "AuthStateActions/LOG_IN_PREV_ROUTE",
  LOADING_USER = "AuthStateActions/LOADING_USER",
}

export type AuthStateActionTypes =
  | LoggedInType
  | SetLogInPrevType
  | LoadingUserType;
