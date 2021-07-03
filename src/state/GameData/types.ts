export interface GameDataState {
    admin: string,
    inGame: boolean,
    roomId: string,
    playerList: player[];
    locationHeaderData: locationHeaderData;
    countdown: number;
}

export interface player {
    username: string,
    socketId: string,
    userId: string,
}

export interface locationHeaderData {
    city?: string;
    province?: string;
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

export enum GameDataActionTypes {
    INIT_GAME_DATA = "gameDataActions/INIT_GAME_DATA",
    IN_GAME_CHANGE = "gameDataActions/IN_GAME_CHANGE",
    ADD_PLAYER = "gameDataActions/ADD_PLAYER",
    DELETE_PLAYER = "gameDataActions/DELETE_PLAYER",
    SET_LOCATION_HEADER_DATA = "gameDataActions/SET_LOCATION_HEADER_DATA",
}

export type GameDataActions = InitGameDataAction | InGameChangeAction | AddPlayerAction | DeletePlayerAction | SetLocationHeaderDataAction;