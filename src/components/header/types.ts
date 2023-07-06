import { BaseState, BaseAttrs } from "base/types";
import { Pages } from "state/CurrentPageState/types";

export interface HeaderState extends BaseState {
  CurrentPage: Pages;
  displaySettings: boolean;
  UserData: {
    username: string;
    userIconSrc: string;
  };
  removeEventListener: () => void;
}

export interface HeaderAttrs extends BaseAttrs {}
