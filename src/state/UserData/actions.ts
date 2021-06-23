import { UpdateUsernameAction, UpdateMapStyleAction,
    UserDataActionTypes, 
    MapStylesKey,
    UserDataState,
    InitUserDataAction} from "./types";


export const InitUserData = (state: UserDataState): InitUserDataAction => {
    return {
        type: UserDataActionTypes.INIT_USER_DATA,
        payload: {
            state
        }
    }
}

export const UpdateUsername = (username: string): UpdateUsernameAction  => {
    return {
        type: UserDataActionTypes.UPDATE_USERNAME,
        payload: {
            username
        }
    } 
}
export const UpdateMapStyle = (mapStyle: MapStylesKey): UpdateMapStyleAction => {
    return {
        type: UserDataActionTypes.UPDATE_MAP_STYLE,
        payload: {
            mapStyle
        }
    }
}