import { BaseAttrs, BaseState } from "base/types";

export interface GameSettingsState extends BaseState{
    resultsToChooseFrom: number;
    maxCountdown: number
    roomId: string;
    guessLimit: number;
};

export interface GameSettingsAttrs extends BaseAttrs{};
