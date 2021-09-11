import {
  InitNukePartyType,
  nukePartyActions,
  nukePartyDataActionTypes,
  nukePartyState,
  nukePartyViewStates,
} from "./types";

const initNukePartyData: nukePartyState = {
  viewState: nukePartyViewStates.WAITING,
  playerList: [],
};

export const nukePartyDataReducer = (
  state: nukePartyState = initNukePartyData,
  action: nukePartyDataActionTypes
): nukePartyState => {
  switch (action.type) {
    case nukePartyActions.INIT_NUKE_PARTY:
      return initNukePartyDataReducer(state, action);
    default:
      return state;
  }
};

const initNukePartyDataReducer = (
  state: nukePartyState,
  action: InitNukePartyType
): nukePartyState => {
  return {
    ...state,
    ...action.payload.state,
  };
};
