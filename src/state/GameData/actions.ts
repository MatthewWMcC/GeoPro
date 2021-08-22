import mapboxgl from "mapbox-gl"
import { AddPlayerAction, AddRoundEndLocationDataAction, ClearGameDataAction, ClearLocationDataAction, DeletePlayerAction, GameDataActionTypes, GameDataState, InGameChangeAction, InitGameDataAction, locationHeaderData, 
    player, ResetGameDataForNewGameAction, SetCurrentMapGuessAction, SetLocationHeaderDataAction, UpdateBaseGameSettingAction, UpdateBestMapGuessAction, UpdateCountdownAction, UpdateDataToAllPlayersAction, UpdateLoadingHeaderAction, UpdateMaxCountdownAction, UpdatePlayerDistanceAndGuessAction, UpdatePlayerGuessNumAction, UpdatePlayerListAction, UpdateResultsToChooseFromAction, UpdateRoundEndCountdownAction, UpdateRoundEndPlayerDataAction, UpdateRoundNumberAction } from "./types"

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

export const UpdateRoundEndCountdown = (roundEndCountdown: number): UpdateRoundEndCountdownAction => {
    return {
        type: GameDataActionTypes.UPDATE_ROUND_END_COUNTDOWN,
        payload: {
            roundEndCountdown
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

export const UpdateResultsToChooseFrom = (resultsToChooseFrom: number): UpdateResultsToChooseFromAction => {
    return {
        type: GameDataActionTypes.UPDATE_RESULTS_TO_CHOOSE_FROM,
        payload: {
            resultsToChooseFrom
        }
    }
}

export const UpdateMaxCountdown = (maxCountdown: number): UpdateMaxCountdownAction => {
    return {
        type: GameDataActionTypes.UPDATE_MAX_COUNTDOWN,
        payload: {
            maxCountdown
        }
    }
}


export const UpdateBaseGameSetting = (data: any): UpdateBaseGameSettingAction => {
    return {
        type: GameDataActionTypes.UPDATE_BASE_SETTING,
        payload: {
            data
        }
    }
}

export const AddRoundEndLocationData = (lnglat: mapboxgl.LngLat, wikiId: string): AddRoundEndLocationDataAction => {
    return {
        type: GameDataActionTypes.ADD_ROUND_END_LOCATION_DATA,
        payload: {
            lnglat,
            wikiId
        }
    }
}

export const ClearLocationData = (): ClearLocationDataAction => {
    return {
        type: GameDataActionTypes.CLEAR_LOCATION_DATA,
        payload: {}
    }
}

export const UpdateRoundEndPlayerData = (playerList: player[]): UpdateRoundEndPlayerDataAction => {
    return{
        type: GameDataActionTypes.UPDATE_ROUND_END_PLAYER_DATA,
        payload: {
            playerList
        }
    }
}

export const ResetGameDataForNewGame = (): ResetGameDataForNewGameAction => {
    return {
        type: GameDataActionTypes.RESET_GAME_DATA_FOR_NEW_GAME,
        payload: {}
    }
}