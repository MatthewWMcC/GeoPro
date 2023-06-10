import { gameModeType, gameTypeId } from "state/GameData/types";

export const capitalPro: gameModeType = {
  id: gameTypeId.CAPITAL_PRO,
  iconSrc:
    "https://storage.googleapis.com/geopro-324602.appspot.com/capital-pro-game-icon.jpeg",
  name: "Capital Pro",
  description:
    "How much do you know about the biggest cities in the world? A lot? What about some of the smallest? Gather some friends to guess the locations of over 10,000 cities and learn about their populations, cultures, and histories.",
  numOfPlayers: "2-10",
};

export const nukeParty: gameModeType = {
  id: gameTypeId.NUKE_PARTY,
  iconSrc:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuclear_symbol.svg/1024px-Nuclear_symbol.svg.png",
  name: "Nuke Party",
  description:
    "Select Countries based on the prompt given but don't be left holding the nuke :O",
  numOfPlayers: "2-8",
};

export const gameModeList: gameModeType[] = [nukeParty, capitalPro];
