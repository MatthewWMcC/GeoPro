import mapboxgl from "mapbox-gl";

export interface GameDataState {
    admin: string;
    inGame: boolean;
    roomId: string;
    playerList: player[];
    locationHeaderData: locationHeaderData;
    countdown: number;
    roundNumber: number;
    maxRound: number;
    loadingHeader: boolean;
    currentMapGuess?: mapboxgl.LngLatLike;
    bestMapGuess?: mapboxgl.LngLatLike;
}

export interface player {
    username: string;
    socketId: string;
    userId: string;
    score: number;
    guessNum: number;
    guess: mapboxgl.LngLatLike;
    distance: number;
}

export interface locationHeaderData {
    city?: string;
    region?: string;
    country?: string;
    [key: string]: string | undefined;
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

export enum GameDataActionTypes {
    INIT_GAME_DATA = "gameDataActions/INIT_GAME_DATA",
    CLEAR_GAME_DATA = "gameDataActions/CLEAR_GAME_DATA",
    IN_GAME_CHANGE = "gameDataActions/IN_GAME_CHANGE",
    ADD_PLAYER = "gameDataActions/ADD_PLAYER",
    DELETE_PLAYER = "gameDataActions/DELETE_PLAYER",
    SET_LOCATION_HEADER_DATA = "gameDataActions/SET_LOCATION_HEADER_DATA",
    UPDATE_ROUND_NUMBER = "gameDataActions/UPDATE_ROUND_NUMBER",
    UPDATE_COUNTDOWN = "gameDataActions/UPDATE_COUNTDOWN",
    LOADING_HEADER = "gameDataActions/LOADING_HEADER",
    CURRENT_MAP_GUESS = "gameDataActions/CURRENT_MAP_GUESS",
    UPDATE_PLAYER_LIST = "gameDataActions/UPDATE_PLAYER_LIST",
    UPDATE_PLAYER_GUESSES = "gameDataActions/UPDATE_PLAYER_GUESSES",
    UPDATE_PLAYER_DISTANCE_AND_GUESS = "gameDataActions/UPDATE_PLAYER_DISTANCE_AND_GUESS",
    UPDATE_DATA_TO_ALL_PLAYERS = "gameDataActions/UPDATE_DATA_TO_ALL_PLAYERS",
    UPDATE_BEST_MAP_GUESS = "gameDataActions/UPDATE_BEST_MAP_GUESS",
}

export type GameDataActions = InitGameDataAction | InGameChangeAction | AddPlayerAction | DeletePlayerAction | SetLocationHeaderDataAction
| UpdateRoundNumberAction | UpdateCountdownAction | UpdateLoadingHeaderAction | ClearGameDataAction | SetCurrentMapGuessAction | UpdatePlayerListAction 
| UpdatePlayerGuessNumAction | UpdateDataToAllPlayersAction | UpdateBestMapGuessAction;