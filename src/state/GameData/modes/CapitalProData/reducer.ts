import {
  AddPlayerCapitalType,
  CapitalProDataActions,
  CapitalProDataActionTypes,
  CapitalProPlayer,
  CapitalProState,
  capitialProViewStates,
  DeletePlayerCapitalType,
  GameEndCapitalType,
  GameStartDataCapitalType,
  InitRoomDataCapitalType,
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

const initCapitalProState: CapitalProState = {
  playerList: [],
  locationData: {},
  countdown: 0,
  roundNumber: 0,
  maxRound: 0,
  resultsToChooseFrom: 5,
  maxCountdown: 20,
  guessLimit: 3,
  roundEndCountdown: 0,
  viewState: capitialProViewStates.WAITING,
};

export const CapitalProDataReducer = (
  state: CapitalProState = initCapitalProState,
  action: CapitalProDataActions
): CapitalProState => {
  switch (action.type) {
    case CapitalProDataActionTypes.INIT_ROOM_DATA:
      return InitRoomDataReducer(state, action);
    case CapitalProDataActionTypes.ADD_PLAYER:
      return AddPlayerReducer(state, action);
    case CapitalProDataActionTypes.DELETE_PLAYER:
      return DeletePlayerReducer(state, action);
    case CapitalProDataActionTypes.UPDATE_RESULT_NUM:
      return UpdateResultNumReducer(state, action);
    case CapitalProDataActionTypes.UPDATE_MAX_COUNTDOWN:
      return UpdateMaxCountdownReducer(state, action);
    case CapitalProDataActionTypes.UPDATE_GUESS_LIMIT:
      return UpdateGuessLimitReducer(state, action);
    case CapitalProDataActionTypes.UPDATE_COUNTDOWN:
      return UpdateCountdownReducer(state, action);
    case CapitalProDataActionTypes.REMOVE_IN_GAME_DATA:
      return RemoveInGameDataReducer(state, action);
    case CapitalProDataActionTypes.GAME_START_DATA:
      return GameStartReducer(state, action);
    case CapitalProDataActionTypes.NEW_ROUND_DATA:
      return NewRoundDataReducer(state, action);
    case CapitalProDataActionTypes.NEW_LOCATION_DATA:
      return NewLocationDataReducer(state, action);
    case CapitalProDataActionTypes.ROUND_END_MODAL_SETUP:
      return RoundEndModalSetupReducer(state, action);
    case CapitalProDataActionTypes.GAME_END:
      return GameEndReducer(state, action);
    case CapitalProDataActionTypes.UPDATED_PLAYER_GUESS_NUM:
      return UpdatePlayerGuessNumReducer(state, action);
    case CapitalProDataActionTypes.UPDATED_CURRENT_GUESS:
      return SetCurrentMapGuessReducer(state, action);
    case CapitalProDataActionTypes.UPDATE_ROUND_END_COUNTDOWN:
      return UpdateRoundEndCountdownReducer(state, action);
    case CapitalProDataActionTypes.UPDATED_BEST_GUESS:
      return UpdateBestGuessReducer(state, action);
    case CapitalProDataActionTypes.SET_VIEW_STATE:
      return SetViewStateReducer(state, action);
    case CapitalProDataActionTypes.CLEAR_DATA:
      return ClearDataReducer(state);
    default:
      return state;
  }
};

const InitRoomDataReducer = (
  state: CapitalProState,
  action: InitRoomDataCapitalType
): CapitalProState => {
  return {
    ...state,
    ...action.payload.state,
  };
};

const AddPlayerReducer = (
  state: CapitalProState,
  action: AddPlayerCapitalType
): CapitalProState => {
  return {
    ...state,
    playerList: [...state.playerList, action.payload.player],
  };
};

const DeletePlayerReducer = (
  state: CapitalProState,
  action: DeletePlayerCapitalType
): CapitalProState => {
  return {
    ...state,
    playerList: state.playerList.filter(
      (player) => player.socketId !== action.payload.userId
    ),
  };
};

const UpdateCountdownReducer = (
  state: CapitalProState,
  action: UpdateCountdownCapitalType
): CapitalProState => {
  return {
    ...state,
    countdown: action.payload.countdown,
  };
};

const UpdateRoundEndCountdownReducer = (
  state: CapitalProState,
  action: UpdateRoundEndCountdownCapitalType
): CapitalProState => {
  return {
    ...state,
    roundEndCountdown: action.payload.roundEndCountdown,
  };
};

const UpdateResultNumReducer = (
  state: CapitalProState,
  action: UpdateResultNumCapitalType
): CapitalProState => {
  return {
    ...state,
    resultsToChooseFrom: action.payload.resultNum,
  };
};

const UpdateMaxCountdownReducer = (
  state: CapitalProState,
  action: UpdateMaxCountdownCapitalType
): CapitalProState => {
  return {
    ...state,
    maxCountdown: action.payload.maxCountdown,
  };
};

const UpdateGuessLimitReducer = (
  state: CapitalProState,
  action: UpdateGuessLimitCapitalType
): CapitalProState => {
  return {
    ...state,
    guessLimit: action.payload.guessLimit,
  };
};

const UpdateBestGuessReducer = (
  state: CapitalProState,
  action: UpdateBestMapGuessCapitalType
): CapitalProState => {
  return {
    ...state,
    bestMapGuess: action.payload.bestMapGuess,
    currentMapGuess: undefined,
  };
};

const SetCurrentMapGuessReducer = (
  state: CapitalProState,
  action: SetCurrentMapGuessCapitalType
): CapitalProState => {
  return {
    ...state,
    currentMapGuess: action.payload.currentMapGuess,
  };
};

const UpdatePlayerGuessNumReducer = (
  state: CapitalProState,
  action: UpdatePlayerGuessNumCapitalType
): CapitalProState => {
  return {
    ...state,
    playerList: state.playerList.map((player) => {
      if (player.userId === action.payload.playerId) {
        return {
          ...player,
          guessNum: action.payload.guessNum,
        };
      } else return player;
    }),
  };
};

const RemoveInGameDataReducer = (
  state: CapitalProState,
  action: RemoveInGameDataCapitalType
): CapitalProState => {
  return {
    ...state,
    viewState: action.payload.viewState,
    playerList: state.playerList.map((player: CapitalProPlayer) => {
      return {
        ...player,
        guessNum: state.guessLimit,
      };
    }),
    roundNumber: 0,
    locationData: {},
  };
};

const GameStartReducer = (
  state: CapitalProState,
  action: GameStartDataCapitalType
): CapitalProState => {
  return {
    ...state,
    playerList: action.payload.playerList,
    viewState: action.payload.viewState,
    locationData: action.payload.locationData,
  };
};

const GameEndReducer = (
  state: CapitalProState,
  action: GameEndCapitalType
): CapitalProState => {
  return {
    ...state,
    viewState: action.payload.viewState,
  };
};

const SetViewStateReducer = (
  state: CapitalProState,
  action: SetViewStateType
): CapitalProState => {
  return {
    ...state,
    viewState: action.payload.viewState,
  };
};

const NewRoundDataReducer = (
  state: CapitalProState,
  action: NewRoundDataCapitalType
): CapitalProState => {
  return {
    ...state,
    countdown: action.payload.countdown,
    roundNumber: action.payload.roundNumber,
    viewState: action.payload.viewState,
    locationData: action.payload.locationData,
    currentMapGuess: undefined,
    bestMapGuess: undefined,
    playerList: state.playerList.map((player) => {
      return {
        ...player,
        guessNum: action.payload.guessNum,
      };
    }),
  };
};

const NewLocationDataReducer = (
  state: CapitalProState,
  action: NewLocationCapitalType
): CapitalProState => {
  return {
    ...state,
    locationData: action.payload.locationData,
  };
};

const RoundEndModalSetupReducer = (
  state: CapitalProState,
  action: RoundEndSetupCapitalType
): CapitalProState => {
  return {
    ...state,
    viewState: action.payload.viewState,
    playerList: action.payload.playerList,
    roundEndCountdown: action.payload.roundEndCountdown,
    locationData: {
      ...state.locationData,
      lnglat: action.payload.roundEndLocationData.lnglat,
      wikiId: action.payload.roundEndLocationData.wikiId,
    },
  };
};

const ClearDataReducer = (state: CapitalProState) => {
  return {
    ...state,
    ...initCapitalProState,
  };
};
