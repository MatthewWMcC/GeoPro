import { BaseAttrs, BaseState } from "base/types";
import { nukeStatus } from "state/GameData/modes/NukePartyData/types";
import { playerType } from "state/GameData/types";

export interface PlayerListAttrs extends BaseAttrs {}

export interface PlayerListState extends BaseState {
  playerList: playerType[];
  turnUserId: string;
  nukeColor: string;
}

export const nukeStatusColorMap = {
  [nukeStatus.GREEN]: "green",
  [nukeStatus.YELLOW]: "yellow",
  [nukeStatus.ORANGE]: "orange",
  [nukeStatus.RED]: "red",
  [nukeStatus.EXPLODED]: "blue",
};

export const nukeStatusSpeedMap = {
  [nukeStatus.GREEN]: "3s",
  [nukeStatus.YELLOW]: "1.5s",
  [nukeStatus.ORANGE]: "1s",
  [nukeStatus.RED]: "0.25s",
  [nukeStatus.EXPLODED]: "0s",
};
