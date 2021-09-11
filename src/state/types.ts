import { AuthState } from "./AuthState/types";
import { CurrentPageState } from "./CurrentPageState/types";
import { GameDataState } from "./GameData/types";
import { UserDataState } from "./UserData/types";

export interface rootState {
  CurrentPageData: CurrentPageState;
  UserData: UserDataState;
  GameData: GameDataState;
  AuthState: AuthState;
}
