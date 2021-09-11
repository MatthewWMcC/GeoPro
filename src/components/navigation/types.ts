import { BaseAttrs, BaseState } from "base/types";
import { Pages } from "state/CurrentPageState/types";

export interface NavigationAttrs extends BaseAttrs {}

export interface NavigationState extends BaseState {
  navShown: boolean;
  CurrentPage: Pages;
}
