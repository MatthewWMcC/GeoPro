import { AddPlayerAction, DeletePlayerAction, GameDataActionTypes, GameDataState, InGameChangeAction, InitGameDataAction, locationHeaderData, player, SetLocationHeaderDataAction } from "./types"

export const InitGameData = (state: GameDataState): InitGameDataAction => {
    return {
        type: GameDataActionTypes.INIT_GAME_DATA,
        payload: {
            state
        }
    }
}

export const InGameChange = (inGame: boolean): InGameChangeAction => {
    return {
        type: GameDataActionTypes.IN_GAME_CHANGE,
        payload: {
            inGame
        }
    }   
}

export const AddPlayer = (newPlayer: player): AddPlayerAction => {
    return {
        type: GameDataActionTypes.ADD_PLAYER,
        payload: {
            newPlayer
        }
    }
}

export const DeletePlayer = (socketId: string): DeletePlayerAction => {
    return {
        type: GameDataActionTypes.DELETE_PLAYER,
        payload: {
            socketId
        }
    }
}

export const setLocationHeaderData = (locationHeaderData: locationHeaderData): SetLocationHeaderDataAction => {
    return {
        type: GameDataActionTypes.SET_LOCATION_HEADER_DATA,
        payload: {
            locationHeaderData
        }
    }
}