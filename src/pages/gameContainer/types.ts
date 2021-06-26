import { BaseAttrs, BaseState } from "base/types";

export interface GameContainerState extends BaseState{
    gamePlaying: boolean;
};

export interface GameContainerAttrs extends BaseAttrs{
    gameId: string;
};
