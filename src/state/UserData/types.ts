
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
        STREET: MapStyle,
    }
    export enum MapStylesEnum {
        DARK = "DARK",
        LIGHT = "LIGHT",
        STREET = "STREET"
    }
    
    export interface MapStyle {
        withBorders: string,
        withoutBorders: string,
        labels: string
    }
    
    export const MapStyles: MapStyleOptions = {
        DARK: {
            withBorders: 'mapbox://styles/matthewmccracken/ckq8q35kr1f5x17o9f6wom6b7?optimize=true',
            withoutBorders: 'mapbox://styles/matthewmccracken/ckq8r6yy05fm617nssmdvo9ul',
            labels: "mapbox://styles/matthewmccracken/ckrjs42wg0yqx17rwazjmvq2i" 
        },
        LIGHT: {
            withBorders: 'mapbox://styles/matthewmccracken/ckqe6wn960vt717qa57ns25os?optimize=true',
            withoutBorders: 'mapbox://styles/matthewmccracken/ckqe6xvh36q2u17n2t6789h8y',
            labels: "mapbox://styles/matthewmccracken/ckrjs42wg0yqx17rwazjmvq2i" 
        },
        STREET: {
            withBorders: 'mapbox://styles/matthewmccracken/ckqo7kkoj1oad18mf8pu411yd',
            withoutBorders: 'mapbox://styles/matthewmccracken/ckqo8aw8x3lz218pab65f7ipb',  
            labels: "mapbox://styles/matthewmccracken/ckrjs42wg0yqx17rwazjmvq2i"   
        }
    }
    
    export type MapStylesKey = keyof MapStyleOptions;
//----------------------