import { combineReducers } from "redux";
import { GameDataReducer } from "./GameData/reducer";
import { UserDataReducer } from "./UserData/reducer";

export const rootReducer = combineReducers({UserData: UserDataReducer, GameData: GameDataReducer});
