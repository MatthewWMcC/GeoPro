import { BaseAttrs, BaseState } from "base/types";
import { player } from "state/GameData/types";

export interface PlayerListAttrs extends BaseAttrs {}

export interface PlayerListState extends BaseState {
    playerList: player[];
}