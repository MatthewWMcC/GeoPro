import { combineReducers } from "redux";
import { GameDataReducer } from "./GameData/reducer";
import { UserDataReducer } from "./UserData/reducer";
import { CapitalProDataReducer } from "./capitalProData/reducer";
import { AuthStateReducer } from "./AuthState/reducer";
import { CurrentPageReducer } from "./CurrentPageState/reducer";

export const rootReducer = combineReducers({
  CurrentPageData: CurrentPageReducer,
  UserData: UserDataReducer,
  GameData: GameDataReducer,
  CapitalProData: CapitalProDataReducer,
  AuthState: AuthStateReducer,
});
