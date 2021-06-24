import { BaseAttrs, BaseState } from "base/types";

export interface NavigationAttrs extends BaseAttrs {}

export interface NavigationState extends BaseState {
    navShown: boolean;
}