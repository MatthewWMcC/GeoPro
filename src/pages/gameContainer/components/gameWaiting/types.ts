import { BaseAttrs, BaseState } from "base/types";
import { player } from "state/GameData/types";

export interface GameWaitingState extends BaseState {
  playerList: player[];
  roomURL: string;
}

export interface GameWaitingAttrs extends BaseAttrs {}
