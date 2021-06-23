import { UserDataState,  
    UserDataActionTypes,
    UserDataActions,
    UpdateUsernameAction
} from "./types"

const initUserData: UserDataState = {
    username: ""
}

export const UserDataReducer = (state = initUserData, action: UserDataActions): UserDataState => {
    switch(action.type) {
        case(UserDataActionTypes.UPDATE_USERNAME):
            return UsernameReducer(state, action);
        default:
            return state
    }
}

const UsernameReducer = (
    state: UserDataState,
    action: UpdateUsernameAction
): UserDataState => {
    console.log(action.payload.username)
    return {
        ...state,
        username: action.payload.username,
    }
}