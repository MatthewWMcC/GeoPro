import {BaseState, BaseAttrs} from "base/types"

export interface HeaderState extends  BaseState {
    username: string;
}

export interface HeaderAttrs extends BaseAttrs {}