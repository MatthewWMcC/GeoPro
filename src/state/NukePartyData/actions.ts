import { InitNukePartyType, nukePartyActions, nukePartyState } from "./types";

export const initGameDataNukeParty = (
  state: nukePartyState
): InitNukePartyType => {
  return {
    type: nukePartyActions.INIT_NUKE_PARTY,
    payload: {
      state,
    },
  };
};
