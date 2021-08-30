import { BaseAttrs, BaseState } from "base/types";
import { CapitalProPlayer } from "state/capitalProData/types";
import { player } from "state/GameData/types";

export interface PlayerListAttrs extends BaseAttrs {}

export interface PlayerListState extends BaseState {
    playerList: CapitalProPlayer[];
}