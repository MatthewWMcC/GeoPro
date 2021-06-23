import { UpdateUsernameAction, 
    UserDataActionTypes } from "./types";

export const UpdateUsername = (username: string): UpdateUsernameAction  => {
    return {
        type: UserDataActionTypes.UPDATE_USERNAME,
        payload: {
            username
        }
    } 
}