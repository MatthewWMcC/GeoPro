
export interface UserDataState {
    username: string,
    preferedMapStyle: MapStyle,
    userId: string,
}

export interface InitUserDataAction {
    type: UserDataActionTypes.INIT_USER_DATA,
    payload: {
        state: UserDataState
    }
}

export interface UpdateUsernameAction {
    type: UserDataActionTypes.UPDATE_USERNAME,
    payload: {
        username: string
    }
}

export interface UpdateMapStyleAction {
    type: UserDataActionTypes.UPDATE_MAP_STYLE,
    payload: {
        mapStyle: MapStylesKey
    }
}

export enum UserDataActionTypes {
    INIT_USER_DATA = "userDataAction/INIT_USER_DATA",
    UPDATE_USERNAME = "userDataAction/UPDATE_USERNAME",
    UPDATE_MAP_STYLE = "userDataAction/UPDATE_MAP_STYLE",
}


export type UserDataActions = 
    UpdateUsernameAction | UpdateMapStyleAction | InitUserDataAction;


//----------map types
export interface MapStyleOptions {
        DARK: MapStyle,
        LIGHT: MapStyle,
    }
    export enum MapStylesEnum {
        DARK = "DARK",
        LIGHT = "LIGHT",
    }
    
    export interface MapStyle {
        withBorders: string,
        withoutBorders: string,
    }
    
    export const MapStyles: MapStyleOptions = {
        DARK: {
            withBorders: 'mapbox://styles/matthewmccracken/ckq8q35kr1f5x17o9f6wom6b7?optimize=true',
            withoutBorders: 'mapbox://styles/matthewmccracken/ckq8r6yy05fm617nssmdvo9ul',
        },
        LIGHT: {
            withBorders: 'mapbox://styles/matthewmccracken/ckqe6wn960vt717qa57ns25os?optimize=true',
            withoutBorders: 'mapbox://styles/matthewmccracken/ckqe6xvh36q2u17n2t6789h8y',
        }
    }
    
    export type MapStylesKey = keyof MapStyleOptions;
//----------------------