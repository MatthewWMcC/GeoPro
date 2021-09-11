import { BaseState, BaseAttrs } from "base/types";

export interface EnterInfoState extends BaseState {
  loggedIn: boolean;
  UserData: {
    username: string;
    userIconSrc: string;
  };
}

export interface EnterInfoAttrs extends BaseAttrs {}
