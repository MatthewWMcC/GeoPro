import { BaseAttrs, BaseState } from "base/types";

export interface GameContainerState extends BaseState{
    inGame: boolean;
};

export interface GameContainerAttrs extends BaseAttrs{
    roomId: string;
};
