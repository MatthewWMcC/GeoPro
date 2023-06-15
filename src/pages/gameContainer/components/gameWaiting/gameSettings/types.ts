import { BaseAttrs, BaseState } from "base/types";
import { gameTypeId } from "state/GameData/types";

export enum GameSettingsTabs {
  HOW_TO_PLAY = "GameSettingsTabs/HOW_TO_PLAY",
  SETTINGS = "GameSettingsTabs/SETTINGS",
}

export interface ITabContent {
  id: GameSettingsTabs;
  label: string;
}

export interface GameSettingsState extends BaseState {
  resultsToChooseFrom?: number;
  maxCountdown?: number;
  roomId: string;
  guessLimit?: number;
  gameMode: gameTypeId;
  tabSelected: GameSettingsTabs;
}

export interface GameSettingsAttrs extends BaseAttrs {}
