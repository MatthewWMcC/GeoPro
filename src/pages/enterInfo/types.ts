import { BaseState, BaseAttrs } from "base/types";

export interface EnterInfoState extends BaseState {
  loggedIn: boolean;
  GuestSignIn: boolean;
  UserData: {
    username: string;
    userIconSrc: string;
  };
}

export interface EnterInfoAttrs extends BaseAttrs {}
