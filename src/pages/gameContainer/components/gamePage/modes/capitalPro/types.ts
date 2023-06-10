import { BaseState, BaseAttrs } from "base/types";
import { capitialProViewStates } from "state/GameData/modes/CapitalProData/types";
import { gameTypeId, GameViewStates, playerType } from "state/GameData/types";

export interface CapitalProState extends BaseState {
  viewState: capitialProViewStates | GameViewStates;
  winningPlayer?: playerType;
  gameMode: gameTypeId;
}

export interface CapitalProAttrs extends BaseAttrs {}
