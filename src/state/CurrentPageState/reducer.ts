import {
  CurrentPageActions,
  CurrentPageState,
  CurrentPageTypes,
  IUpdateCurrentPage,
  Pages,
} from "./types";

const initCurrentPageState: CurrentPageState = {
  CurrentPage: Pages.MAIN,
};

export const CurrentPageReducer = (
  state: CurrentPageState = initCurrentPageState,
  action: CurrentPageTypes
): CurrentPageState => {
  switch (action.type) {
    case CurrentPageActions.UPDATE_CURRENT_PAGE:
      return UpdateCurrentPageReducer(state, action);
    default:
      return state;
  }
};

export const UpdateCurrentPageReducer = (
  state: CurrentPageState,
  action: IUpdateCurrentPage
): CurrentPageState => {
  return {
    ...state,
    CurrentPage: action.payload.page,
  };
};
