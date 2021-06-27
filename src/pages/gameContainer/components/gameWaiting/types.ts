import { BaseAttrs, BaseState } from "base/types";
import { player } from "state/GameData/types";

export interface GameWaitingState extends BaseState{
    roomId: string;
    playerList: player[];
};

export interface GameWaitingAttrs extends BaseAttrs{};
