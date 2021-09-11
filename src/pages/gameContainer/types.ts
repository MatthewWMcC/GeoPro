import { BaseAttrs, BaseState } from "base/types";
import { capitialProViewStates } from "state/GameData/modes/CapitalProData/types";
import { gameModeType, gameTypeId, GameViewStates } from "state/GameData/types";

export interface GameContainerState extends BaseState {
  viewState: capitialProViewStates | GameViewStates;
  GameViewState: GameViewStates;
  gameMode: gameTypeId;
}

export interface GameContainerAttrs extends BaseAttrs {
  roomId: string;
}
