import { GameDataState } from "./GameData/types";
import { UserDataState } from "./UserData/types";

export interface rootState {
    UserData: UserDataState;
    GameData: GameDataState;
}