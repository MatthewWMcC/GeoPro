import { combineReducers } from "redux";
import { UserDataReducer } from "./UserData/reducer";

export const rootReducer = combineReducers({UserData: UserDataReducer });
