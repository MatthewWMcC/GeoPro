import {
  AddPlayerType,
  ClearDataType,
  DeletePlayerType,
  GameDataActionTypes,
  GameDataState,
  GameViewStates,
  InitRoomDataType,
  NewAdminType,
  player,
  playerType,
  SetGameViewType,
} from "./types";

export const InitRoomData = (state: GameDataState): InitRoomDataType => {
  return {
    type: GameDataActionTypes.INIT_ROOM_DATA,
    payload: {
      state,
    },
  };
};

export const ClearGameData = (): ClearDataType => {
  return {
    type: GameDataActionTypes.CLEAR_DATA,
    payload: {},
  };
};

export const AddPlayer = (player: playerType): AddPlayerType => {
  return {
    type: GameDataActionTypes.ADD_PLAYER,
    payload: {
      player,
    },
  };
};

export const DeletePlayer = (userId: string): DeletePlayerType => {
  return {
    type: GameDataActionTypes.DELETE_PLAYER,
    payload: {
      userId,
    },
  };
};

export const NewAdmin = (userId: string): NewAdminType => {
  return {
    type: GameDataActionTypes.NEW_ADMIN,
    payload: {
      userId,
    },
  };
};

export const SetGameViewState = (
  GameViewState: GameViewStates
): SetGameViewType => {
  return {
    type: GameDataActionTypes.SET_GAME_VIEW_STATE,
    payload: {
      GameViewState,
    },
  };
};
