import { BaseAttrs, BaseState } from "base/types";
import { capitialProViewStates } from "state/capitalProData/types";
import { GameViewStates } from "state/GameData/types";

export interface GameContainerState extends BaseState{
    viewState: capitialProViewStates;
    GameViewState: GameViewStates;
};

export interface GameContainerAttrs extends BaseAttrs{
    roomId: string;
};
