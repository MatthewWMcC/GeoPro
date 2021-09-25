import { gameTypeId } from "state/GameData/types";
import {
  countryType,
  InitNukePartyType,
  nukePartyActions,
  nukePartyState,
  nukePartyViewStates,
  questionType,
  setCurrentTurnType,
  setInGameViewStateType,
  setNewQuestionType,
  setSelectedCountryType,
} from "./types";

export const initGameDataNukeParty = (
  state: nukePartyState
): InitNukePartyType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.INIT_NUKE_PARTY,
    payload: {
      state,
    },
  };
};

export const setSelectedCountry = (
  country: countryType
): setSelectedCountryType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.SET_SELECTED_COUNTRY,
    payload: {
      country,
    },
  };
};

export const setInGameViewState = (
  viewState: nukePartyViewStates
): setInGameViewStateType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.SET_IN_GAME_VIEW_STATE,
    payload: {
      viewState,
    },
  };
};

export const setNewTurn = (turnUserId: string): setCurrentTurnType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.SET_CURRENT_TURN_ID,
    payload: {
      turnUserId,
    },
  };
};

export const setNewQestion = (question: questionType): setNewQuestionType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.SET_NEW_QUESTION,
    payload: {
      question,
    },
  };
};
