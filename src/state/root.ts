import { combineReducers } from "redux";
import { GameDataReducer } from "./GameData/reducer";
import { UserDataReducer } from "./UserData/reducer";
import { AuthStateReducer } from "./AuthState/reducer";
import { CurrentPageReducer } from "./CurrentPageState/reducer";
// import { nukePartyDataReducer } from "./NukePartyData/reducer";

export const rootReducer = combineReducers({
  CurrentPageData: CurrentPageReducer,
  UserData: UserDataReducer,
  GameData: GameDataReducer,
  AuthState: AuthStateReducer,
});
