export interface UserDataState {
    username: string,
}

export interface UpdateUsernameAction {
    type: UserDataActionTypes.UPDATE_USERNAME,
    payload: {
        username: string
    }
}

export enum UserDataActionTypes {
    UPDATE_USERNAME = "userDataAction/UPDATE_USERNAME"
}

export type UserDataActions = 
    UpdateUsernameAction;
