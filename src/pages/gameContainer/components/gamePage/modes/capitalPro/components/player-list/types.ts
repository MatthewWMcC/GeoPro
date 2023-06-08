import { BaseAttrs, BaseState } from "base/types";
import { CapitalProPlayer } from "state/GameData/modes/CapitalProData/types";

export interface PlayerListAttrs extends BaseAttrs {}

export interface PlayerListState extends BaseState {
  playerList: CapitalProPlayer[];
}
