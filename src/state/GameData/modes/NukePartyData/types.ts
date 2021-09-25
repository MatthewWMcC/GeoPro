import { gameTypeId } from "state/GameData/types";

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
  GAME_OVER = "nukePartyViewStates/GAME_OVER",
}

export interface nukePartyState {
  viewState: nukePartyViewStates;
  playerList: nukePartyPlayer[];
  selected?: countryType;
  turnUserId?: string;
  question?: questionType;
  nukeStatus?: nukeStatus;
  canGuess?: boolean;
  guessStatus?: guessStatus;
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

export interface updatePlayerLivesType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.UPDATE_PLAYER_LIVES;
  payload: {
    userId: string;
    lives: number;
  };
}

export interface setNukeStatusType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.SET_NUKE_STATUS;
  payload: {
    status: nukeStatus;
  };
}

export interface updateCanGuessType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.UPDATE_CAN_GUESS;
  payload: {
    canGuess: boolean;
  };
}

export interface setGuessStatusType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.SET_GUESS_STATUS;
  payload: {
    guessStatus: guessStatus;
  };
}

export interface updateAllPlayerLivesType {
  mode: gameTypeId.NUKE_PARTY;
  type: nukePartyActions.UPDATE_ALL_PLAYER_LIVES;
  payload: {
    maxLives: number;
  };
}

export enum nukePartyActions {
  INIT_NUKE_PARTY = "nukePartyActions/INIT_NUKE_PARTY",
  SET_SELECTED_COUNTRY = "nukePartyActions/SET_SELECTED_COUNTRY",
  SET_IN_GAME_VIEW_STATE = "nukePartyActions/SET_IN_GAME_VIEW_STATE",
  SET_CURRENT_TURN_ID = "nukePartyActions/SET_CURRENT_TURN_ID",
  SET_NEW_QUESTION = "nukePartyActions/SET_NEW_QUESTION",
  UPDATE_PLAYER_LIVES = "nukePartyActions/UPDATE_PLAYER_LIVES",
  SET_NUKE_STATUS = "nukePartyActions/SET_NUKE_STATUS",
  UPDATE_CAN_GUESS = "nukePartyActions/UPDATE_CAN_GUESS",
  SET_GUESS_STATUS = "nukePartyActions/SET_GUESS_STATUS",
  UPDATE_ALL_PLAYER_LIVES = "nukePartyActions/UPDATE_ALL_PLAYER_LIVES",
}
export interface countryType {
  name: string;
  countryCode: string;
}

export interface questionType {
  question: string;
  imageSrc?: string;
}

export enum nukeStatus {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  RED = "RED",
  EXPLODED = "EXPLODED",
}

export enum guessStatus {
  CORRECT = "CORRECT",
  WRONG = "WRONG",
  DUPLICATE = "DUPLICATE",
}

export type nukePartyDataActionTypes =
  | InitNukePartyType
  | setSelectedCountryType
  | setInGameViewStateType
  | setCurrentTurnType
  | setNewQuestionType
  | updatePlayerLivesType
  | setNukeStatusType
  | updateCanGuessType
  | setGuessStatusType
  | updateAllPlayerLivesType;
