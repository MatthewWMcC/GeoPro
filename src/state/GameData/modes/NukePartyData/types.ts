import { gameModeType, gameTypeId } from "state/GameData/types";

export interface nukePartyPlayer {
  username: string;
  userId: string;
  socketId: string;
  userIconSrc: string;
  lives: number;
}

export enum nukePartyViewStates {
  WAITING = "nukePartyViewStates/WAITING",
  IN_GAME = "nukePartyViewStates/IN_GAME",
}

export interface nukePartyState {
  viewState: nukePartyViewStates;
  playerList: nukePartyPlayer[];
  selected?: countryType;
  turnUserId?: string;
  question?: questionType;
}

export interface InitNukePartyType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.INIT_NUKE_PARTY;
  payload: {
    state: nukePartyState;
  };
}

export interface setSelectedCountryType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.SET_SELECTED_COUNTRY;
  payload: {
    country: countryType;
  };
}

export interface setInGameViewStateType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.SET_IN_GAME_VIEW_STATE;
  payload: {
    viewState: nukePartyViewStates;
  };
}

export interface setCurrentTurnType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.SET_CURRENT_TURN_ID;
  payload: {
    turnUserId: string;
  };
}

export interface setNewQuestionType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.SET_NEW_QUESTION;
  payload: {
    question: questionType;
  };
}

export enum nukePartyActions {
  INIT_NUKE_PARTY = "nukePartyActions/INIT_NUKE_PARTY",
  SET_SELECTED_COUNTRY = "nukePartyActions/SET_SELECTED_COUNTRY",
  SET_IN_GAME_VIEW_STATE = "nukePartyActions/SET_IN_GAME_VIEW_STATE",
  SET_CURRENT_TURN_ID = "nukePartyActions/SET_CURRENT_TURN_ID",
  SET_NEW_QUESTION = "nukePartyActions/SET_NEW_QUESTION",
}
export interface countryType {
  name: string;
  countryCode: string;
}

export interface questionType {
  question: string;
  imageSrc?: string;
}

export type nukePartyDataActionTypes =
  | InitNukePartyType
  | setSelectedCountryType
  | setInGameViewStateType
  | setCurrentTurnType
  | setNewQuestionType;
