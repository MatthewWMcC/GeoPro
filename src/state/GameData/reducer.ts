import { AddPlayerType, DeletePlayerType, GameDataActions, GameDataActionTypes, GameDataState, gameTypeId, GameViewStates, InitRoomDataType, NewAdminType, SetGameViewType } from "./types"

const initGameData: GameDataState = {
    admin: "",
    roomId: "",
    playerList: [],
    gameMode: gameTypeId.NO_GAME,
    GameViewState: GameViewStates.LOADING,
}

export const GameDataReducer = (state: GameDataState = initGameData, action: GameDataActions) : GameDataState => {
    switch(action.type) {
        case(GameDataActionTypes.INIT_ROOM_DATA):
            return InitRoomDataReducer(state, action)
        case(GameDataActionTypes.ADD_PLAYER):
            return AddPlayerReducer(state, action)
        case(GameDataActionTypes.DELETE_PLAYER):
            return DeletePlayerReducer(state, action)
        case(GameDataActionTypes.CLEAR_DATA):
            return ClearGameDataReducer(state)
        case(GameDataActionTypes.NEW_ADMIN):
            return NewAdminReducer(state, action )
        case(GameDataActionTypes.SET_GAME_VIEW_STATE):
            return SetGameViewReducer(state, action)
        default:
            return state
    }
}

const InitRoomDataReducer = (state: GameDataState, action: InitRoomDataType): GameDataState => {
    return({
        ...state,
        ...action.payload.state,
    })
}

const ClearGameDataReducer = (state: GameDataState): GameDataState => {
    return({
        ...state,
        ...initGameData
    })
}

const AddPlayerReducer = (state: GameDataState, action: AddPlayerType): GameDataState => {
    return({
        ...state,
        playerList: [...state.playerList, action.payload.player]
    })
}

const DeletePlayerReducer = (state: GameDataState, action: DeletePlayerType): GameDataState => {
    return({
        ...state,
        playerList: state.playerList.filter(player => player.userId !== action.payload.userId)
    })
}

const NewAdminReducer = (state: GameDataState, action: NewAdminType): GameDataState => {
    return ({
        ...state,
        admin: action.payload.userId
    })
}

const SetGameViewReducer = (state: GameDataState, action: SetGameViewType): GameDataState => {
    return({
        ...state,
        GameViewState: action.payload.GameViewState
    })
}

