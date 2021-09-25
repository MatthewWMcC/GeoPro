import {
  InitNukePartyType,
  nukePartyActions,
  nukePartyDataActionTypes,
  nukePartyState,
  nukePartyViewStates,
  setCurrentTurnType,
  setInGameViewStateType,
  setNewQuestionType,
  setSelectedCountryType,
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
    case nukePartyActions.SET_SELECTED_COUNTRY:
      return setSelectedCountryReducer(state, action);
    case nukePartyActions.SET_IN_GAME_VIEW_STATE:
      return setInGameViewStateReducer(state, action);
    case nukePartyActions.SET_CURRENT_TURN_ID:
      return setCurrentTurnReducer(state, action);
    case nukePartyActions.SET_NEW_QUESTION:
      return setNewQuestionReducer(state, action);
    default:
      return initNukePartyData;
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

const setSelectedCountryReducer = (
  state: nukePartyState,
  action: setSelectedCountryType
): nukePartyState => {
  return {
    ...state,
    selected: action.payload.country,
  };
};

const setInGameViewStateReducer = (
  state: nukePartyState,
  action: setInGameViewStateType
): nukePartyState => {
  return {
    ...state,
    viewState: action.payload.viewState,
  };
};

const setCurrentTurnReducer = (
  state: nukePartyState,
  action: setCurrentTurnType
): nukePartyState => {
  return {
    ...state,
    turnUserId: action.payload.turnUserId,
  };
};

const setNewQuestionReducer = (
  state: nukePartyState,
  action: setNewQuestionType
): nukePartyState => {
  return {
    ...state,
    question: action.payload.question,
  };
};
