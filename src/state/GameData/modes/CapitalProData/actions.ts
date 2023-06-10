import { gameTypeId } from "state/GameData/types";
import {
  CapitalProDataActionTypes,
  CapitalProPlayer,
  CapitalProState,
  capitialProViewStates,
  ClearDataCapitalType,
  GameEndCapitalType,
  GameStartDataCapitalType,
  InitRoomDataCapitalType,
  LocationData,
  NewLocationCapitalType,
  NewRoundDataCapitalType,
  RemoveInGameDataCapitalType,
  RoundEndSetupCapitalType,
  SetCurrentMapGuessCapitalType,
  SetViewStateType,
  UpdateBestMapGuessCapitalType,
  UpdateCountdownCapitalType,
  UpdateGuessLimitCapitalType,
  UpdateMaxCountdownCapitalType,
  UpdatePlayerGuessNumCapitalType,
  UpdateResultNumCapitalType,
  UpdateRoundEndCountdownCapitalType,
} from "./types";

export const InitRoomDataCapital = (
  state: CapitalProState
): InitRoomDataCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.INIT_ROOM_DATA,
    payload: {
      state,
    },
  };
};

export const UpdateResultNum = (
  resultNum: number
): UpdateResultNumCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATE_RESULT_NUM,
    payload: {
      resultNum,
    },
  };
};

export const UpdateMaxCountdown = (
  maxCountdown: number
): UpdateMaxCountdownCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATE_MAX_COUNTDOWN,
    payload: {
      maxCountdown,
    },
  };
};

export const UpdateGuessLimit = (
  guessLimit: number
): UpdateGuessLimitCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATE_GUESS_LIMIT,
    payload: {
      guessLimit,
    },
  };
};

export const RemoveInGameData = (
  playerList: CapitalProPlayer[],
  viewState: capitialProViewStates
): RemoveInGameDataCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.REMOVE_IN_GAME_DATA,
    payload: {
      playerList,
      viewState,
    },
  };
};

export const GameStartData = (
  playerList: CapitalProPlayer[],
  locationData: LocationData,
  viewState: capitialProViewStates
): GameStartDataCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.GAME_START_DATA,
    payload: {
      playerList,
      locationData,
      viewState,
    },
  };
};

export const NewRoundData = (
  guessNum: number,
  countdown: number,
  roundNumber: number,
  viewState: capitialProViewStates,
  locationData: LocationData
): NewRoundDataCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.NEW_ROUND_DATA,
    payload: {
      guessNum,
      countdown,
      roundNumber,
      viewState,
      locationData,
    },
  };
};

export const NewLocationData = (
  locationData: LocationData
): NewLocationCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.NEW_LOCATION_DATA,
    payload: {
      locationData,
    },
  };
};

export const RoundEndSetup = (
  viewState: capitialProViewStates,
  playerList: CapitalProPlayer[],
  roundEndCountdown: number,
  roundEndLocationData: LocationData
): RoundEndSetupCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.ROUND_END_MODAL_SETUP,
    payload: {
      viewState,
      playerList,
      roundEndCountdown,
      roundEndLocationData,
    },
  };
};

export const UpdateCountdown = (
  countdown: number
): UpdateCountdownCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATE_COUNTDOWN,
    payload: {
      countdown,
    },
  };
};

export const UpdateRoundEndCountdown = (
  roundEndCountdown: number
): UpdateRoundEndCountdownCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATE_ROUND_END_COUNTDOWN,
    payload: {
      roundEndCountdown,
    },
  };
};

export const GameEnd = (
  viewState: capitialProViewStates
): GameEndCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.GAME_END,
    payload: {
      viewState,
    },
  };
};

export const UpdatePlayerGuessNum = (
  playerId: string,
  guessNum: number
): UpdatePlayerGuessNumCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATED_PLAYER_GUESS_NUM,
    payload: {
      playerId,
      guessNum,
    },
  };
};

export const UpdateBestMapGuess = (
  bestMapGuess: mapboxgl.LngLatLike
): UpdateBestMapGuessCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATED_BEST_GUESS,
    payload: {
      bestMapGuess,
    },
  };
};

export const SetCurrentMapGuess = (
  currentMapGuess?: mapboxgl.LngLatLike
): SetCurrentMapGuessCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.UPDATED_CURRENT_GUESS,
    payload: {
      currentMapGuess,
    },
  };
};

export const SetViewState = (
  viewState: capitialProViewStates
): SetViewStateType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.SET_VIEW_STATE,
    payload: {
      viewState,
    },
  };
};

export const ClearCapitalProData = (): ClearDataCapitalType => {
  return {
    mode: gameTypeId.CAPITAL_PRO,
    type: CapitalProDataActionTypes.CLEAR_DATA,
    payload: {},
  };
};
