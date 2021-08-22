import {BaseState, BaseAttrs} from "base/types"
import { player } from "state/GameData/types";

export interface GamePageState extends BaseState {
    showRoundEndModal: boolean;
    showGameEnd: boolean;
    winningPlayer?: player;
}

export interface GamePageAttrs extends BaseAttrs {

}