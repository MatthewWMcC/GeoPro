import mapboxgl from "mapbox-gl";

export interface GameDataState {
    admin: string;
    inGame: boolean;
    roomId: string;
    playerList: player[];
    locationHeaderData?: locationHeaderData;
    locationData?: locationData;
    countdown: number;
    roundNumber: number;
    maxRound: number;
    loadingHeader: boolean;
    resultsToChooseFrom: number;
    maxCountdown: number;
    guessLimit: number;
    currentMapGuess?: mapboxgl.LngLatLike;
    bestMapGuess?: mapboxgl.LngLatLike;
    roundEndCountdown: number;
    initDataStatus: boolean;
    showGameEnd: boolean;
}

export interface player {
    username: string;
    socketId: string;
    userId: string;
    score: number;
    addedScore: number;
    guessNum: number;
    guess?: mapboxgl.LngLatLike;
    distance?: number;
}

export interface locationHeaderData {
    city: string;
    region: string;
    country: string;
    [key: string]: string | undefined;
}

export interface locationData {
    lnglat: mapboxgl.LngLat,
    wikiId: string;
}

export type locationHeaderDataKey = keyof locationHeaderData;

export interface InitGameDataAction {
    type: GameDataActionTypes.INIT_GAME_DATA,
    payload: {
        state: GameDataState
    }
}

export interface ClearGameDataAction {
    type: GameDataActionTypes.CLEAR_GAME_DATA,
    payload: {}
}

export interface InGameChangeAction {
    type: GameDataActionTypes.IN_GAME_CHANGE,
    payload: {
        inGame: boolean
    }
}

export interface AddPlayerAction {
    type: GameDataActionTypes.ADD_PLAYER,
    payload: {
        newPlayer: player
    } 
}

export interface DeletePlayerAction {
    type: GameDataActionTypes.DELETE_PLAYER,
    payload: {
        socketId: string
    }
}

export interface SetLocationHeaderDataAction {
    type: GameDataActionTypes.SET_LOCATION_HEADER_DATA,
    payload: {
        locationHeaderData: locationHeaderData
    }
}

export interface UpdateRoundNumberAction {
    type: GameDataActionTypes.UPDATE_ROUND_NUMBER,
    payload: {
        roundNumber: number
    }
}

export interface UpdateCountdownAction {
    type: GameDataActionTypes.UPDATE_COUNTDOWN,
    payload: {
        countdown: number
    }
}

export interface UpdateRoundEndCountdownAction {
    type: GameDataActionTypes.UPDATE_ROUND_END_COUNTDOWN,
    payload: {
        roundEndCountdown: number
    }
}

export interface UpdateLoadingHeaderAction {
    type: GameDataActionTypes.LOADING_HEADER,
    payload: {
        loadingHeader: boolean
    }
}

export interface SetCurrentMapGuessAction {
    type: GameDataActionTypes.CURRENT_MAP_GUESS,
    payload: {
        currentMapGuess: mapboxgl.LngLatLike
    }
} 

export interface UpdatePlayerListAction {
    type: GameDataActionTypes.UPDATE_PLAYER_LIST,
    payload: {
        playerListOrder: string[]
    }
}

export interface UpdatePlayerGuessNumAction {
    type: GameDataActionTypes.UPDATE_PLAYER_GUESSES,
    payload: {
        playerId: string,
        guessNum: number,
    }
}

export interface UpdatePlayerDistanceAndGuessAction {
    type: GameDataActionTypes.UPDATE_PLAYER_DISTANCE_AND_GUESS,
    payload: {
        playerId: string,
        guess: mapboxgl.LngLatLike,
        distance: number,
    }
}

export interface UpdateDataToAllPlayersAction {
    type: GameDataActionTypes.UPDATE_DATA_TO_ALL_PLAYERS,
    payload: {
        data: any
    }
}

export interface UpdateBestMapGuessAction {
    type: GameDataActionTypes.UPDATE_BEST_MAP_GUESS,
    payload: {
        bestMapGuess?: mapboxgl.LngLatLike,
    }
}

export interface UpdateResultsToChooseFromAction {
    type: GameDataActionTypes.UPDATE_RESULTS_TO_CHOOSE_FROM,
    payload: {
        resultsToChooseFrom: number;
    }
}

export interface UpdateMaxCountdownAction {
    type: GameDataActionTypes.UPDATE_MAX_COUNTDOWN,
    payload: {
        maxCountdown: number;
    }
}

export interface UpdateBaseGameSettingAction {
    type: GameDataActionTypes.UPDATE_BASE_SETTING,
    payload: {
        data: any
    }
}

export interface AddRoundEndLocationDataAction {
    type: GameDataActionTypes.ADD_ROUND_END_LOCATION_DATA,
    payload: {
        lnglat: mapboxgl.LngLat,
        wikiId: string,
    }
}

export interface ClearLocationDataAction {
    type: GameDataActionTypes.CLEAR_LOCATION_DATA,
    payload: {}
}

export interface UpdateRoundEndPlayerDataAction {
    type: GameDataActionTypes.UPDATE_ROUND_END_PLAYER_DATA,
    payload: {
        playerList: player[]
    }
}

export interface ResetGameDataForNewGameAction {
    type: GameDataActionTypes.RESET_GAME_DATA_FOR_NEW_GAME,
    payload: {

    }
}

export enum GameDataActionTypes {
    INIT_GAME_DATA = "gameDataActions/INIT_GAME_DATA",
    CLEAR_GAME_DATA = "gameDataActions/CLEAR_GAME_DATA",
    IN_GAME_CHANGE = "gameDataActions/IN_GAME_CHANGE",
    ADD_PLAYER = "gameDataActions/ADD_PLAYER",
    DELETE_PLAYER = "gameDataActions/DELETE_PLAYER",
    SET_LOCATION_HEADER_DATA = "gameDataActions/SET_LOCATION_HEADER_DATA",
    UPDATE_ROUND_NUMBER = "gameDataActions/UPDATE_ROUND_NUMBER",
    UPDATE_COUNTDOWN = "gameDataActions/UPDATE_COUNTDOWN",
    UPDATE_ROUND_END_COUNTDOWN = "gameDataActions/UPDATE_ROUND_END_COUNTDOWN",
    LOADING_HEADER = "gameDataActions/LOADING_HEADER",
    CURRENT_MAP_GUESS = "gameDataActions/CURRENT_MAP_GUESS",
    UPDATE_PLAYER_LIST = "gameDataActions/UPDATE_PLAYER_LIST",
    UPDATE_PLAYER_GUESSES = "gameDataActions/UPDATE_PLAYER_GUESSES",
    UPDATE_PLAYER_DISTANCE_AND_GUESS = "gameDataActions/UPDATE_PLAYER_DISTANCE_AND_GUESS",
    UPDATE_DATA_TO_ALL_PLAYERS = "gameDataActions/UPDATE_DATA_TO_ALL_PLAYERS",
    UPDATE_BEST_MAP_GUESS = "gameDataActions/UPDATE_BEST_MAP_GUESS",
    UPDATE_RESULTS_TO_CHOOSE_FROM = "gameDataActions/UPDATE_RESULTS_TO_CHOOSE_FROM",
    UPDATE_MAX_COUNTDOWN = "gameDataActions/UPDATE_MAX_COUNTDOWN",
    UPDATE_BASE_SETTING = "gameDataActions/UPDATE_BASE_SETTING",
    ADD_ROUND_END_LOCATION_DATA = "gameDataActions/ADD_ROUND_END_LOCATION_DATA",
    CLEAR_LOCATION_DATA = 'gameDataActions/CLEAR_LOCATION_DATA',
    UPDATE_ROUND_END_PLAYER_DATA = "gameDataActions/UPDATE_ROUND_END_PLAYER_DATA",
    RESET_GAME_DATA_FOR_NEW_GAME = "gameDataActions/RESET_GAME_DATA_FOR_NEW_GAME"
}

export type GameDataActions = InitGameDataAction | InGameChangeAction | AddPlayerAction | DeletePlayerAction | SetLocationHeaderDataAction
| UpdateRoundNumberAction | UpdateCountdownAction | UpdateLoadingHeaderAction | ClearGameDataAction | SetCurrentMapGuessAction | UpdatePlayerListAction 
| UpdatePlayerGuessNumAction | UpdateDataToAllPlayersAction | UpdateRoundEndPlayerDataAction | AddRoundEndLocationDataAction
| ClearLocationDataAction | UpdateBestMapGuessAction | UpdateResultsToChooseFromAction | UpdateMaxCountdownAction 
| UpdateRoundEndCountdownAction|UpdateBaseGameSettingAction | ResetGameDataForNewGameAction;