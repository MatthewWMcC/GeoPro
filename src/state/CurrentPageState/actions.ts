import { CurrentPageActions, IUpdateCurrentPage, Pages } from "./types";

export const UpdateCurrentPage = (page: Pages): IUpdateCurrentPage => {
  return {
    type: CurrentPageActions.UPDATE_CURRENT_PAGE,
    payload: {
      page,
    },
  };
};
