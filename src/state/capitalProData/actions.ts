import { AddPlayerCapitalType, CapitalProDataActionTypes, CapitalProPlayer, CapitalProState, capitialProViewStates, ClearDataCapitalType, DeletePlayerCapitalType, GameEndCapitalType, GameStartDataCapitalType, InitRoomDataCapitalType, LocationData, NewLocationCapitalType, NewRoundDataCapitalType, RemoveInGameDataCapitalType, RoundEndSetupCapitalType, SetCurrentMapGuessCapitalType, SetViewStateType, UpdateBestMapGuessCapitalType, UpdateCountdownCapitalType, UpdateGuessLimitCapitalType, UpdateMaxCountdownCapitalType, UpdatePlayerGuessNumCapitalType, UpdateResultNumCapitalType, UpdateRoundEndCountdownCapitalType } from "./types"

export const InitRoomDataCapital = (state: CapitalProState): InitRoomDataCapitalType => {
    return {
        type: CapitalProDataActionTypes.INIT_ROOM_DATA,
        payload: {
            state
        }
    }
}

export const AddPlayerCapital = (player: CapitalProPlayer): AddPlayerCapitalType => {
    return {
        type: CapitalProDataActionTypes.ADD_PLAYER,
        payload: {
            player
        }
    }
}

export const DeletePlayerCapital = (userId: string): DeletePlayerCapitalType => {
    return {
        type: CapitalProDataActionTypes.DELETE_PLAYER,
        payload: {
            userId
        }
    }
}

export const UpdateResultNum = (resultNum: number): UpdateResultNumCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATE_RESULT_NUM,
        payload: {
            resultNum
        }
    }
}

export const UpdateMaxCountdown = (maxCountdown: number): UpdateMaxCountdownCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATE_MAX_COUNTDOWN,
        payload: {
            maxCountdown
        }
    }
}

export const UpdateGuessLimit = (guessLimit: number): UpdateGuessLimitCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATE_GUESS_LIMIT,
        payload: {
            guessLimit
        }
    }
}

export const RemoveInGameData = (playerList: CapitalProPlayer[], roundNumber: number, locationData: LocationData, viewState: capitialProViewStates): RemoveInGameDataCapitalType => {
    return {
        type: CapitalProDataActionTypes.REMOVE_IN_GAME_DATA,
        payload: {
            playerList,
            roundNumber,
            locationData,
            viewState
        }
    }
}

export const GameStartData = (playerList: CapitalProPlayer[], locationData: LocationData, viewState: capitialProViewStates): GameStartDataCapitalType => {
    return {
        type: CapitalProDataActionTypes.GAME_START_DATA,
        payload: {
            playerList,
            locationData,
            viewState
        }
    }
}

export const NewRoundData = (guessNum: number, 
    countdown: number, 
    roundNumber: number, 
    viewState: capitialProViewStates, 
    locationData: LocationData
): NewRoundDataCapitalType => {
    return {
        type: CapitalProDataActionTypes.NEW_ROUND_DATA,
        payload: {
            guessNum, 
            countdown, 
            roundNumber, 
            viewState, 
            locationData
        }  
    }
}

export const NewLocationData = (locationData: LocationData
): NewLocationCapitalType => {
    return {
        type: CapitalProDataActionTypes.NEW_LOCATION_DATA,
        payload: {
            locationData
        }  
    }
}

export const RoundEndSetup = (
    viewState: capitialProViewStates, 
    playerList: CapitalProPlayer[], 
    roundEndCountdown: number, 
    roundEndLocationData: LocationData
): RoundEndSetupCapitalType => {
    return {
        type: CapitalProDataActionTypes.ROUND_END_MODAL_SETUP,
        payload: {
            viewState, 
            playerList, 
            roundEndCountdown, 
            roundEndLocationData
        } 
    }
}

export const UpdateCountdown = (
    countdown: number
): UpdateCountdownCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATE_COUNTDOWN,
        payload: {
            countdown
        }  
    }
}

export const UpdateRoundEndCountdown = (
    roundEndCountdown: number
): UpdateRoundEndCountdownCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATE_ROUND_END_COUNTDOWN,
        payload: {
            roundEndCountdown
        }  
    }
}

export const GameEnd = (
    viewState: capitialProViewStates
): GameEndCapitalType => {
    return {
        type: CapitalProDataActionTypes.GAME_END,
        payload: {
            viewState
        }
    }
}

export const UpdatePlayerGuessNum = (
    playerId: string,
    guessNum: number,
): UpdatePlayerGuessNumCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATED_PLAYER_GUESS_NUM,
        payload: {
            playerId,
            guessNum,
        }
    }
}

export const UpdateBestMapGuess = (
    bestMapGuess: mapboxgl.LngLatLike,
): UpdateBestMapGuessCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATED_BEST_GUESS,
        payload: {
            bestMapGuess
        }
    }
}

export const SetCurrentMapGuess = (
    currentMapGuess?: mapboxgl.LngLatLike,
): SetCurrentMapGuessCapitalType => {
    return {
        type: CapitalProDataActionTypes.UPDATED_CURRENT_GUESS,
        payload: {
            currentMapGuess
        }
    }
}

export const SetViewState = (
    viewState: capitialProViewStates
): SetViewStateType => {
    return {
        type: CapitalProDataActionTypes.SET_VIEW_STATE,
        payload: {
            viewState
        }
    }
}

export const ClearCapitalProData = (): ClearDataCapitalType => {
    return {
        type: CapitalProDataActionTypes.CLEAR_DATA,
        payload:{}
    }
}