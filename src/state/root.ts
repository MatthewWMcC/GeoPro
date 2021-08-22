import { combineReducers } from "redux";
import { GameDataReducer } from "./GameData/reducer";
import { UserDataReducer } from "./UserData/reducer";
import { CapitalProDataReducer } from "./capitalProData/reducer";

export const rootReducer = combineReducers({UserData: UserDataReducer, GameData: GameDataReducer, CapitalProData: CapitalProDataReducer});
