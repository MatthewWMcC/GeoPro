import { CapitalProDataReducer } from "./modes/CapitalProData/reducer";
import { CapitalProDataActions } from "./modes/CapitalProData/types";
import { nukePartyDataReducer } from "./modes/NukePartyData/reducer";
import { nukePartyDataActionTypes } from "./modes/NukePartyData/types";
import {
  AddPlayerType,
  DeletePlayerType,
  GameDataActions,
  GameDataActionTypes,
  GameDataState,
  gameTypeId,
  GameViewStates,
  InitRoomDataType,
  NewAdminType,
  SetGameViewType,
  UpdateBeginningCountdownType,
} from "./types";

const initGameData: GameDataState = {
  admin: "",
  roomId: "",
  gameMode: gameTypeId.NO_GAME,
  GameViewState: GameViewStates.LOADING,
};

export const GameDataReducer = (
  state: GameDataState = initGameData,
  action: GameDataActions | nukePartyDataActionTypes | CapitalProDataActions
): GameDataState => {
  switch (action.mode) {
    case gameTypeId.NUKE_PARTY:
      return NukePartyReducer(state, action);
    case gameTypeId.CAPITAL_PRO:
      return CapitalProReducer(state, action);
    default:
      switch (action.type) {
        case GameDataActionTypes.INIT_ROOM_DATA:
          return InitRoomDataReducer(state, action);
        case GameDataActionTypes.CLEAR_DATA:
          return ClearGameDataReducer(state);
        case GameDataActionTypes.NEW_ADMIN:
          return NewAdminReducer(state, action);
        case GameDataActionTypes.SET_GAME_VIEW_STATE:
          return SetGameViewReducer(state, action);
        case GameDataActionTypes.ADD_PLAYER:
          return AddPlayerReducer(state, action);
        case GameDataActionTypes.DELETE_PLAYER:
          return DeletePlayerReducer(state, action);
        case GameDataActionTypes.UPDATE_BEGINNING_COUNTDOWN:
          return UpdateBeginningCountdownReducer(state, action);
        default:
          return state;
      }
  }
};

const NukePartyReducer = (
  state: GameDataState,
  action: nukePartyDataActionTypes
): GameDataState => {
  return {
    ...state,
    modeData: nukePartyDataReducer(state.modeData, action),
  };
};

const CapitalProReducer = (
  state: GameDataState,
  action: CapitalProDataActions
): GameDataState => {
  return {
    ...state,
    modeData: CapitalProDataReducer(state.modeData, action),
  };
};

const InitRoomDataReducer = (
  state: GameDataState,
  action: InitRoomDataType
): GameDataState => {
  return {
    ...state,
    ...action.payload.state,
  };
};

const ClearGameDataReducer = (state: GameDataState): GameDataState => {
  return {
    ...initGameData,
  };
};

const AddPlayerReducer = (
  state: GameDataState,
  action: AddPlayerType
): GameDataState => {
  return {
    ...state,
    modeData: {
      ...state.modeData,
      playerList: [...state.modeData?.playerList, action.payload.player],
    },
  };
};

const DeletePlayerReducer = (
  state: GameDataState,
  action: DeletePlayerType
): GameDataState => {
  return {
    ...state,
    modeData: {
      ...state.modeData,
      playerList: state.modeData?.playerList.filter(
        (player) => player.userId !== action.payload.userId
      ),
    },
  };
};

const NewAdminReducer = (
  state: GameDataState,
  action: NewAdminType
): GameDataState => {
  return {
    ...state,
    admin: action.payload.userId,
  };
};

const SetGameViewReducer = (
  state: GameDataState,
  action: SetGameViewType
): GameDataState => {
  return {
    ...state,
    GameViewState: action.payload.GameViewState,
    message: action.payload.message ? action.payload.message : undefined,
  };
};

const UpdateBeginningCountdownReducer = (
  state: GameDataState,
  action: UpdateBeginningCountdownType
): GameDataState => {
  return {
    ...state,
    beginningCountdown: action.payload.beginningCountdown,
  };
};
