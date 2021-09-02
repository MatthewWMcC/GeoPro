export enum CapitalProDataActionTypes {
  INIT_ROOM_DATA = "capitalProDataActions/INIT_ROOM_DATA",
  ADD_PLAYER = "capitalProDataActions/ADD_PLAYER",
  DELETE_PLAYER = "capitalProDataActions/DELETE_PLAYER",
  UPDATE_RESULT_NUM = "capitalProDataActions/UPDATE_RESULT_NUM",
  UPDATE_MAX_COUNTDOWN = "capitalProDataActions/UPDATE_MAX_COUNTDOWN",
  UPDATE_GUESS_LIMIT = "capitalProDataActions/UPDATE_GUESS_LIMIT",
  REMOVE_IN_GAME_DATA = "capitalProDataActions/REMOVE_IN_GAME_DATA",
  GAME_START_DATA = "capitalProDataActions/GAME_START_DATA",
  NEW_ROUND_DATA = "capitalProDataActions/NEW_ROUND_DATA",
  NEW_LOCATION_DATA = "capitalProDataActions/NEW_LOCATION_DATA",
  ROUND_END_MODAL_SETUP = "capitalProDataActions/ROUND_END_MODAL_SETUP",
  UPDATE_COUNTDOWN = "capitalProDataActions/UPDATE_COUNTDOWN",
  UPDATE_ROUND_END_COUNTDOWN = "capitalProDataActions/UPDATE_ROUND_END_COUNTDOWN",
  GAME_END = "capitalProDataActions/GAME_END",
  UPDATED_PLAYER_GUESS_NUM = "capitalProDataActions/UPDATED_PLAYER_GUESS_NUM",
  UPDATED_BEST_GUESS = "capitalProDataActions/UPDATED_BEST_GUESS",
  UPDATED_CURRENT_GUESS = "capitalProDataActions/UPDATED_CURRENT_GUESS",
  SET_VIEW_STATE = "capitalProDataActions/SET_VIEW_STATE",
  CLEAR_DATA = "capitalProDataActions/CLEAR_DATA",
}

export interface InitRoomDataCapitalType {
  type: CapitalProDataActionTypes.INIT_ROOM_DATA;
  payload: {
    state: CapitalProState;
  };
}

export interface AddPlayerCapitalType {
  type: CapitalProDataActionTypes.ADD_PLAYER;
  payload: {
    player: CapitalProPlayer;
  };
}

export interface DeletePlayerCapitalType {
  type: CapitalProDataActionTypes.DELETE_PLAYER;
  payload: {
    userId: string;
  };
}

export interface UpdateResultNumCapitalType {
  type: CapitalProDataActionTypes.UPDATE_RESULT_NUM;
  payload: {
    resultNum: number;
  };
}

export interface UpdateMaxCountdownCapitalType {
  type: CapitalProDataActionTypes.UPDATE_MAX_COUNTDOWN;
  payload: {
    maxCountdown: number;
  };
}

export interface UpdateGuessLimitCapitalType {
  type: CapitalProDataActionTypes.UPDATE_GUESS_LIMIT;
  payload: {
    guessLimit: number;
  };
}

export interface RemoveInGameDataCapitalType {
  type: CapitalProDataActionTypes.REMOVE_IN_GAME_DATA;
  payload: {
    playerList: CapitalProPlayer[];
    roundNumber: number;
    locationData: LocationData;
    viewState: capitialProViewStates;
  };
}

export interface GameStartDataCapitalType {
  type: CapitalProDataActionTypes.GAME_START_DATA;
  payload: {
    playerList: CapitalProPlayer[];
    locationData: LocationData;
    viewState: capitialProViewStates;
  };
}

export interface NewRoundDataCapitalType {
  type: CapitalProDataActionTypes.NEW_ROUND_DATA;
  payload: {
    guessNum: number;
    countdown: number;
    roundNumber: number;
    viewState: capitialProViewStates;
    locationData: LocationData;
  };
}

export interface NewLocationCapitalType {
  type: CapitalProDataActionTypes.NEW_LOCATION_DATA;
  payload: {
    locationData: LocationData;
  };
}

export interface RoundEndSetupCapitalType {
  type: CapitalProDataActionTypes.ROUND_END_MODAL_SETUP;
  payload: {
    viewState: capitialProViewStates;
    playerList: CapitalProPlayer[];
    roundEndCountdown: number;
    roundEndLocationData: LocationData;
  };
}

export interface UpdateCountdownCapitalType {
  type: CapitalProDataActionTypes.UPDATE_COUNTDOWN;
  payload: {
    countdown: number;
  };
}

export interface UpdateRoundEndCountdownCapitalType {
  type: CapitalProDataActionTypes.UPDATE_ROUND_END_COUNTDOWN;
  payload: {
    roundEndCountdown: number;
  };
}

export interface GameEndCapitalType {
  type: CapitalProDataActionTypes.GAME_END;
  payload: {
    viewState: capitialProViewStates;
  };
}

export interface UpdatePlayerGuessNumCapitalType {
  type: CapitalProDataActionTypes.UPDATED_PLAYER_GUESS_NUM;
  payload: {
    playerId: string;
    guessNum: number;
  };
}

export interface UpdateBestMapGuessCapitalType {
  type: CapitalProDataActionTypes.UPDATED_BEST_GUESS;
  payload: {
    bestMapGuess: mapboxgl.LngLatLike;
  };
}

export interface SetCurrentMapGuessCapitalType {
  type: CapitalProDataActionTypes.UPDATED_CURRENT_GUESS;
  payload: {
    currentMapGuess?: mapboxgl.LngLatLike;
  };
}

export interface SetViewStateType {
  type: CapitalProDataActionTypes.SET_VIEW_STATE;
  payload: {
    viewState: capitialProViewStates;
  };
}

export interface ClearDataCapitalType {
  type: CapitalProDataActionTypes.CLEAR_DATA;
  payload: {};
}

export type CapitalProDataActions =
  | InitRoomDataCapitalType
  | AddPlayerCapitalType
  | DeletePlayerCapitalType
  | RemoveInGameDataCapitalType
  | NewLocationCapitalType
  | UpdateGuessLimitCapitalType
  | UpdateBestMapGuessCapitalType
  | SetCurrentMapGuessCapitalType
  | UpdateCountdownCapitalType
  | UpdateRoundEndCountdownCapitalType
  | UpdateMaxCountdownCapitalType
  | GameEndCapitalType
  | UpdateResultNumCapitalType
  | RoundEndSetupCapitalType
  | GameStartDataCapitalType
  | NewRoundDataCapitalType
  | UpdatePlayerGuessNumCapitalType
  | SetViewStateType
  | ClearDataCapitalType;

export interface CapitalProState {
  playerList: CapitalProPlayer[];
  locationData: LocationData;
  countdown: number;
  roundNumber: number;
  maxRound: number;
  resultsToChooseFrom: number;
  maxCountdown: number;
  guessLimit: number;
  currentMapGuess?: mapboxgl.LngLatLike;
  bestMapGuess?: mapboxgl.LngLatLike;
  roundEndCountdown: number;
  viewState: capitialProViewStates;
}

export interface CapitalProPlayer {
  socketId: string;
  userId: string;
  username: string;
  userIconSrc: string;
  score: number;
  guessNum: number;
  guess: mapboxgl.LngLatLike;
  distance: number;
  addedScore: number;
}

export interface LocationData {
  city?: string;
  region?: string;
  country?: string;
  lnglat?: mapboxgl.LngLat;
  wikiId?: string;
}

export enum capitialProViewStates {
  WAITING = "capitialProViewStates/WAITING",
  IN_GAME = "capitialProViewStates/IN_GAME",
  ROUND_END_MODAL = "capitialProViewStates/ROUND_END_MODAL",
  GAME_END = "capitialProViewStates/GAME_END",
}
