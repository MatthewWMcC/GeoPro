import { BaseAttrs, BaseState } from "base/types";

export interface GameContainerState extends BaseState{
    inGame: boolean;
    doneLoading: boolean;
};

export interface GameContainerAttrs extends BaseAttrs{
    roomId: string;
};
