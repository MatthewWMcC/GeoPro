import { BaseState, BaseAttrs } from "base/types";
import { gameTypeId } from "state/GameData/types";

export interface GamePageState extends BaseState {
  gameMode: gameTypeId;
  countdown: number;
}

export interface GamePageAttrs extends BaseAttrs {}
