import { BaseAttrs, BaseState } from "base/types";
import { gameTypeId } from "state/GameData/types";

export interface GameSettingsState extends BaseState {
  resultsToChooseFrom?: number;
  maxCountdown?: number;
  roomId: string;
  guessLimit?: number;
  gameMode: gameTypeId;
}

export interface GameSettingsAttrs extends BaseAttrs {}
