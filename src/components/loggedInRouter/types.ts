import m from "mithril";
import { BaseAttrs, BaseState } from "base/types";

export interface loggedInRouterAttrs extends BaseAttrs {
  childComponent: m.Vnode<any, any>;
}

export interface loggedInRouterState extends BaseState {
  loggedIn: boolean;
  loadingUser: boolean;
}
