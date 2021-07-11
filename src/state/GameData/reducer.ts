import { UpdateBestMapGuess } from "./actions";
import { AddPlayerAction, ClearGameDataAction, DeletePlayerAction, GameDataActions, GameDataActionTypes, GameDataState, 
    InGameChangeAction, InitGameDataAction, SetCurrentMapGuessAction, SetLocationHeaderDataAction, UpdateBestMapGuessAction, UpdateCountdownAction, UpdateDataToAllPlayersAction, UpdateLoadingHeaderAction, UpdatePlayerGuessNumAction, UpdateRoundNumberAction } from "./types";

const initGameData: GameDataState = {
    admin: "",
    inGame: false,
    roomId: "",
    playerList: [],
    locationHeaderData: {},
    countdown: 0,
    roundNumber: 0,
    maxRound: 10,
    loadingHeader: true,
}

export const GameDataReducer = (state: GameDataState = initGameData, action: GameDataActions) : GameDataState => {
    switch(action.type) {
        case(GameDataActionTypes.INIT_GAME_DATA):
            return InitGameDataReducer(state, action)
        case(GameDataActionTypes.IN_GAME_CHANGE):
            return InGameChangeReducer(state, action)
        case(GameDataActionTypes.ADD_PLAYER):
            return AddPlayerReducer(state, action)
        case(GameDataActionTypes.DELETE_PLAYER):
            return DeletePlayerReducer(state, action)
        case(GameDataActionTypes.SET_LOCATION_HEADER_DATA):
            return SetLocationHeaderDataReducer(state, action)
        case(GameDataActionTypes.UPDATE_ROUND_NUMBER):
            return UpdateRoundNumberReducer(state, action)
        case(GameDataActionTypes.UPDATE_COUNTDOWN):
            return UpdateCountdownReducer(state, action)
        case(GameDataActionTypes.LOADING_HEADER):
            return UpdateLoadingHeaderReducer(state, action)
        case(GameDataActionTypes.CLEAR_GAME_DATA):
            return ClearGameDataReducer(state, action)
        case(GameDataActionTypes.CURRENT_MAP_GUESS):
            return SetCurrentMapGuessReducer(state, action)
        case(GameDataActionTypes.UPDATE_PLAYER_GUESSES):
            return UpdatePlayerGuessNumReducer(state, action)
        case(GameDataActionTypes.UPDATE_DATA_TO_ALL_PLAYERS):
            return UpdateDataToAllPlayersReducer(state, action)
        case(GameDataActionTypes.UPDATE_BEST_MAP_GUESS):
            return UpdateBestMapGuessReducer(state, action)
        default:
            return state
    }
}

const InitGameDataReducer = (state: GameDataState, action: InitGameDataAction): GameDataState => {
    return({
        ...state,
        ...action.payload.state
    })
}

const ClearGameDataReducer = (state: GameDataState, action: ClearGameDataAction): GameDataState => {
    return({
        ...initGameData
    })
}

const InGameChangeReducer = (state: GameDataState, action: InGameChangeAction): GameDataState => {
    return({
        ...state,
        inGame: action.payload.inGame
    })
}

const AddPlayerReducer = (state: GameDataState, action: AddPlayerAction): GameDataState => {
    return({
        ...state,
        playerList: [...state.playerList, action.payload.newPlayer]
    })
}

const DeletePlayerReducer = (state: GameDataState, action: DeletePlayerAction): GameDataState => {
    return({
        ...state,
        playerList: state.playerList.filter(player => player.socketId !== action.payload.socketId)
    })
}

const SetLocationHeaderDataReducer = (state: GameDataState, action: SetLocationHeaderDataAction): GameDataState => {
    return({
        ...state,
        locationHeaderData: action.payload.locationHeaderData,
    })
}

const UpdateRoundNumberReducer = (state: GameDataState, action: UpdateRoundNumberAction) => {
    return({
        ...state,
        roundNumber: action.payload.roundNumber
    })
}

const UpdateCountdownReducer = (state: GameDataState, action: UpdateCountdownAction) => {
    return({
        ...state,
        countdown: action.payload.countdown
    })
}

const UpdateLoadingHeaderReducer = (state: GameDataState, action: UpdateLoadingHeaderAction) => {
    return({
        ...state,
        loadingHeader: action.payload.loadingHeader
    })
}

const SetCurrentMapGuessReducer = (state: GameDataState, action: SetCurrentMapGuessAction) => {
    return({
        ...state,
        currentMapGuess: action.payload.currentMapGuess
    })
}

const UpdatePlayerGuessNumReducer = (state: GameDataState, action: UpdatePlayerGuessNumAction) => {
    return({
        ...state,
        playerList: [...state.playerList.map(player => {
            return { ...player,
                guessNum: player.socketId === action.payload.playerId ? action.payload.guessNum : player.guessNum
            }
        })]
    })
}

const UpdateDataToAllPlayersReducer = (state: GameDataState, action: UpdateDataToAllPlayersAction) => {
    return({
        ...state,
        playerList: state.playerList.map(player => {
            return {...player,
                ...action.payload.data
            }
        })
    })
}

const UpdateBestMapGuessReducer = (state: GameDataState, action: UpdateBestMapGuessAction) => {
    return({
        ...state,
        bestMapGuess: action.payload.bestMapGuess
    })
}