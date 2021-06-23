import { UserDataState,  
    UserDataActionTypes,
    UserDataActions,
    UpdateUsernameAction,
    UpdateMapStyleAction,
    MapStyles,
    InitUserDataAction,
} from "./types"

const initUserData: UserDataState = {
    username: "",
    preferedMapStyle: MapStyles.DARK,
}

export const UserDataReducer = (state:UserDataState = initUserData, action: UserDataActions): UserDataState => {
    switch(action.type) {
        case(UserDataActionTypes.INIT_USER_DATA):
            return InitUserDataReducer(state, action);
        case(UserDataActionTypes.UPDATE_USERNAME):
            return UsernameReducer(state, action);
        case(UserDataActionTypes.UPDATE_MAP_STYLE):
            return MapStyleReducer(state, action);
        default:
            return state
    }
}

const InitUserDataReducer = (
    state: UserDataState,
    action: InitUserDataAction
): UserDataState => {
    
    return {
        ...state,
        ...action.payload.state
    }
}

const UsernameReducer = (
    state: UserDataState,
    action: UpdateUsernameAction
): UserDataState => {
    return {
        ...state,
        username: action.payload.username,
    }
}


const MapStyleReducer = (
    state: UserDataState,
    action: UpdateMapStyleAction
): UserDataState => {
    console.log(action.payload.mapStyle)
    console.log(MapStyles[action.payload.mapStyle])
    return {
        ...state,
        preferedMapStyle: MapStyles[action.payload.mapStyle],
    }
}
