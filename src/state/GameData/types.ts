import {
  CapitalProPlayer,
  CapitalProState,
} from "./modes/CapitalProData/types";
import { nukePartyPlayer, nukePartyState } from "./modes/NukePartyData/types";

export interface GameDataState {
  admin: string;
  roomId: string;
  gameMode: gameTypeId;
  GameViewState: GameViewStates;
  modeData?: CapitalProState | nukePartyState;
}

export enum gameTypeId {
  NO_GAME = "gameType/NO_GAME",
  CAPITAL_PRO = "gameType/CAPITAL_PRO",
  NUKE_PARTY = "gameType/NUKE_PARTY",
}

export interface player {
  socketId: string;
  userId: string;
  username: string;
  userIconSrc: string;
}

export type playerType = CapitalProPlayer | nukePartyPlayer;

export interface InitRoomDataType {
  type: GameDataActionTypes.INIT_ROOM_DATA;
  payload: {
    state: GameDataState;
  };
}

export interface AddPlayerType {
  type: GameDataActionTypes.ADD_PLAYER;
  payload: {
    player: playerType;
  };
}

export interface DeletePlayerType {
  type: GameDataActionTypes.DELETE_PLAYER;
  payload: {
    userId: string;
  };
}

export interface NewAdminType {
  type: GameDataActionTypes.NEW_ADMIN;
  payload: {
    userId: string;
  };
}

export interface ClearDataType {
  type: GameDataActionTypes.CLEAR_DATA;
  payload: {};
}

export interface SetGameViewType {
  type: GameDataActionTypes.SET_GAME_VIEW_STATE;
  payload: {
    GameViewState: GameViewStates;
  };
}

export type GameDataActions =
  | ClearDataType
  | AddPlayerType
  | DeletePlayerType
  | InitRoomDataType
  | NewAdminType
  | SetGameViewType;

export enum GameViewStates {
  IN_GAME = "gameViewStates/IN_GAME",
  WAITING = "gameViewStates/WAITING",
  LOADING = "gameViewStates/LOADING",
  ROOM_NOT_FOUND = "gameViewStates/ROOM_NOT_FOUND",
  DUPLICATE_PLAYER_IN_ROOM = "gameViewStates/DUPLICATE_PLAYER_IN_ROOM",
}

export enum GameDataActionTypes {
  INIT_ROOM_DATA = "gameDataActions/INIT_ROOM_DATA",
  ADD_PLAYER = "gameDataActions/ADD_PLAYER",
  DELETE_PLAYER = "gameDataActions/DELETE_PLAYER",
  NEW_ADMIN = "gameDataActions/NEW_ADMIN",
  CLEAR_DATA = "gameDataActions/CLEAR_DATA",
  SET_GAME_VIEW_STATE = "gameDataActions/SET_GAME_VIEW_STATE",
}

export interface gameModeType {
  id: gameTypeId;
  iconSrc: string;
  name: string;
  description: string;
  numOfPlayers: string;
}
