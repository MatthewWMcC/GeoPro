import { AddPlayerAction, ClearGameDataAction, DeletePlayerAction, GameDataActionTypes, GameDataState, InGameChangeAction, InitGameDataAction, locationHeaderData, 
    player, SetCurrentMapGuessAction, SetLocationHeaderDataAction, UpdateBestMapGuessAction, UpdateCountdownAction, UpdateDataToAllPlayersAction, UpdateLoadingHeaderAction, UpdatePlayerDistanceAndGuessAction, UpdatePlayerGuessNumAction, UpdatePlayerListAction, UpdateRoundNumberAction } from "./types"

export const InitGameData = (state: GameDataState): InitGameDataAction => {
    return {
        type: GameDataActionTypes.INIT_GAME_DATA,
        payload: {
            state
        }
    }
}

export const ClearGameData = (): ClearGameDataAction => {
    return {
        type: GameDataActionTypes.CLEAR_GAME_DATA,
        payload: {}
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

export const UpdateLoadingHeader = (loadingHeader: boolean): UpdateLoadingHeaderAction => {
    return {
        type: GameDataActionTypes.LOADING_HEADER,
        payload: {
            loadingHeader
        }
    }
}

export const setCurrentMapGuess = (currentMapGuess: mapboxgl.LngLatLike): SetCurrentMapGuessAction => {
    return {
        type: GameDataActionTypes.CURRENT_MAP_GUESS,
        payload: {
            currentMapGuess
        }
    }
}

export const UpdatePlayerList = (playerListOrder: string[]): UpdatePlayerListAction => {
    return {
        type: GameDataActionTypes.UPDATE_PLAYER_LIST,
        payload: {
            playerListOrder
        }
    }
}

export const UpdatePlayerGuessNum = (playerId: string, guessNum: number): UpdatePlayerGuessNumAction => {
    return {
        type: GameDataActionTypes.UPDATE_PLAYER_GUESSES,
        payload: {
            playerId,
            guessNum,
        }
    }
}

export const UpdatePlayerDistanceAndGuess = (playerId: string, guess: mapboxgl.LngLatLike, distance: number): UpdatePlayerDistanceAndGuessAction => {
    return {
        type: GameDataActionTypes.UPDATE_PLAYER_DISTANCE_AND_GUESS,
        payload: {
            playerId,
            guess,
            distance,
        }
    }
}

export const UpdateDataToAllPlayers = (data: any): UpdateDataToAllPlayersAction => {
    return {
        type: GameDataActionTypes.UPDATE_DATA_TO_ALL_PLAYERS,
        payload: {
            data
        }
    }
}

export const UpdateBestMapGuess = (bestMapGuess?: mapboxgl.LngLatLike): UpdateBestMapGuessAction => {
    return {
        type: GameDataActionTypes.UPDATE_BEST_MAP_GUESS,
        payload: {
            bestMapGuess
        }
    }
}