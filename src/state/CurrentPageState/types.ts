export interface CurrentPageState {
  CurrentPage: Pages;
}

export enum Pages {
  LOGIN = "Pages/LOGIN",
  MAIN = "Pages/MAIN",
  IN_GAME = "Pages/IN_GAME",
}

export interface IUpdateCurrentPage {
  type: CurrentPageActions.UPDATE_CURRENT_PAGE;
  payload: {
    page: Pages;
  };
}

export enum CurrentPageActions {
  UPDATE_CURRENT_PAGE = "CurrentPageActions/UPDATE_CURRENT_PAGE",
}

export type CurrentPageTypes = IUpdateCurrentPage;
