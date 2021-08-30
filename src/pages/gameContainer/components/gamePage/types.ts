import {BaseState, BaseAttrs} from "base/types"
import { CapitalProPlayer, capitialProViewStates } from "state/capitalProData/types";

export interface GamePageState extends BaseState {
    viewState: capitialProViewStates;
    winningPlayer?: CapitalProPlayer;
}

export interface GamePageAttrs extends BaseAttrs {

}