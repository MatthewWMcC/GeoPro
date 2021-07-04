import { AddPlayerAction, DeletePlayerAction, GameDataActionTypes, GameDataState, InGameChangeAction, InitGameDataAction, locationHeaderData, 
    player, SetLocationHeaderDataAction, UpdateCountdownAction, UpdateLoadingHeaderAction, UpdateRoundNumberAction } from "./types"

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

export const SetLocationHeaderData = (locationHeaderData: locationHeaderData): SetLocationHeaderDataAction => {
    return {
        type: GameDataActionTypes.SET_LOCATION_HEADER_DATA,
        payload: {
            locationHeaderData
        }
    }
}

export const UpdateRoundNumber = (roundNumber: number): UpdateRoundNumberAction => {
    return {
        type: GameDataActionTypes.UPDATE_ROUND_NUMBER,
        payload: {
            roundNumber
        }
    }
}

export const UpdateCountdown = (countdown: number): UpdateCountdownAction => {
    return {
        type: GameDataActionTypes.UPDATE_COUNTDOWN,
        payload: {
            countdown
        }
    }
}

export const UpdateLoadingHeader = (loading: boolean): UpdateLoadingHeaderAction => {
    return {
        type: GameDataActionTypes.LOADING_HEADER,
        payload: {
            loading
        }
    }
}