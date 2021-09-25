export interface nukePartyPlayer {
  username: string;
  userId: string;
  socketId: string;
  userIconSrc: string;
  lives: number;
}

export enum nukePartyViewStates {
  WAITING = "nukePartyViewStates/WAITING",
  IN_GAME = "nukePartyViewStates/IN_GAME",
}

export interface nukePartyState {
  viewState: nukePartyViewStates;
  playerList: nukePartyPlayer[];
}

export interface InitNukePartyType {
  type: nukePartyActions.INIT_NUKE_PARTY;
  payload: {
    state: nukePartyState;
  };
}

export interface AddNukePartyPlayer {}

export enum nukePartyActions {
  INIT_NUKE_PARTY = "nukePartyActions/INIT_NUKE_PARTY",
  ADD_NUKE_PARTY_PLAYER = "nukePartyActions/ADD_NUKE_PARTY_PLAYER",
}

export type nukePartyDataActionTypes = InitNukePartyType;
