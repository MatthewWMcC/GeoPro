import {
  InitNukePartyType,
  nukePartyActions,
  nukePartyDataActionTypes,
  nukePartyPlayer,
  nukePartyState,
  nukePartyViewStates,
  nukeStatus,
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
    case nukePartyActions.UPDATE_PLAYER_LIVES:
      return updatePlayerLives(state, action);
    case nukePartyActions.SET_NUKE_STATUS:
      return setNukeStatusReducer(state, action);
    case nukePartyActions.UPDATE_CAN_GUESS:
      return updateCanGuessReducer(state, action);
    case nukePartyActions.SET_GUESS_STATUS:
      return setGuessStatusReducer(state, action);
    case nukePartyActions.UPDATE_ALL_PLAYER_LIVES:
      return updateAllPlayerLivesReducer(state, action);
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
    nukeStatus: nukeStatus.GREEN,
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

const updatePlayerLives = (
  state: nukePartyState,
  action: updatePlayerLivesType
): nukePartyState => {
  return {
    ...state,
    playerList: state.playerList.map((player: nukePartyPlayer) => {
      return {
        ...player,
        lives:
          player.userId === action.payload.userId
            ? action.payload.lives
            : player.lives,
      };
    }),
  };
};

const setNukeStatusReducer = (
  state: nukePartyState,
  action: setNukeStatusType
): nukePartyState => {
  return {
    ...state,
    nukeStatus: action.payload.status,
  };
};

const updateCanGuessReducer = (
  state: nukePartyState,
  action: updateCanGuessType
): nukePartyState => {
  return {
    ...state,
    canGuess: action.payload.canGuess,
    guessStatus: undefined,
    selected: action.payload.canGuess ? undefined : state.selected,
  };
};

const setGuessStatusReducer = (
  state: nukePartyState,
  action: setGuessStatusType
): nukePartyState => {
  return {
    ...state,
    guessStatus: action.payload.guessStatus,
  };
};

const updateAllPlayerLivesReducer = (
  state: nukePartyState,
  action: updateAllPlayerLivesType
): nukePartyState => {
  return {
    ...state,
    playerList: state.playerList.map((player) => {
      return {
        ...player,
        lives: action.payload.maxLives,
      };
    }),
  };
};
