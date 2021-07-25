import { combineReducers } from "redux";
import { GameDataReducer } from "./GameData/reducer";
import { UserDataReducer } from "./UserData/reducer";
import { CurrentPageDataReducer } from "./currentPageData/reducer";

export const rootReducer = combineReducers({UserData: UserDataReducer, GameData: GameDataReducer, CurrentPageData: CurrentPageDataReducer});
