import { gameTypeId } from "state/GameData/types";
import {
  countryType,
  guessStatus,
  InitNukePartyType,
  nukePartyActions,
  nukePartyState,
  nukePartyViewStates,
  nukeStatus,
  questionType,
  setCurrentTurnType,
  setGuessStatusType,
  setInGameViewStateType,
  setNewQuestionType,
  setNukeStatusType,
  setSelectedCountryType,
  updateAllPlayerLivesType,
  updateCanGuessType,
  updatePlayerLivesType,
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

export const updatePlayerLives = (
  userId: string,
  lives: number
): updatePlayerLivesType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.UPDATE_PLAYER_LIVES,
    payload: {
      userId,
      lives,
    },
  };
};

export const setNukeStatus = (status: nukeStatus): setNukeStatusType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.SET_NUKE_STATUS,
    payload: {
      status,
    },
  };
};

export const updateCanGuess = (canGuess: boolean): updateCanGuessType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.UPDATE_CAN_GUESS,
    payload: {
      canGuess,
    },
  };
};

export const setGuessStatus = (
  guessStatus: guessStatus
): setGuessStatusType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.SET_GUESS_STATUS,
    payload: {
      guessStatus,
    },
  };
};

export const updateAllPlayerLives = (
  maxLives: number
): updateAllPlayerLivesType => {
  return {
    mode: gameTypeId.NUKE_PARTY,
    type: nukePartyActions.UPDATE_ALL_PLAYER_LIVES,
    payload: {
      maxLives,
    },
  };
};
