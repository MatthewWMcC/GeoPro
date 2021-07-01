import { AddPlayerAction, DeletePlayerAction, GameDataActionTypes, GameDataState, InGameChangeAction, InitGameDataAction, player } from "./types"

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