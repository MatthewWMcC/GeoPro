const gameType = {
  CAPITAL_PRO: "gameType/CAPITAL_PRO",
  NUKE_PARTY: "gameType/NUKE_PARTY",
};

const capitialProViewStates = {
  // WAITING: "capitialProViewStates/WAITING",
  // IN_GAME: "capitialProViewStates/IN_GAME",
  ROUND_END_MODAL: "capitialProViewStates/ROUND_END_MODAL",
  GAME_END: "capitialProViewStates/GAME_END",
};

const GameViewStates = {
  WAITING: "gameViewStates/WAITING",
  IN_GAME: "gameViewStates/IN_GAME",
};

const nukePartyViewStates = {
  WAITING: "nukePartyViewStates/WAITING",
  IN_GAME: "nukePartyViewStates/IN_GAME",
};

const initBaseGameData = {
  admin: "",
  playerList: [],
};

const initCapitalProData = {
  roundNumber: 0,
  maxRound: 10,
  locationData: {},
  countdown: 0,
  maxCountdown: 20,
  guessLimit: 3,
  numberOfLocationResults: 199,
  resultsToChooseFrom: 3,
  roundEndCountdown: 0,
  maxRoundEndCountdown: 15,
  viewState: GameViewStates.WAITING,
};

const initNukePartyData = {
  usedCountries: ["CA", "FR", "FI"],
  viewState: GameViewStates.WAITING,
  queue: [],
};

const initCapitalProPlayerData = {
  score: 0,
  guess: null,
  distance: null,
  addedScore: 0,
};

const initNukePartyPlayerData = {
  lives: 3,
};

const testDataNukeParty = [
  {
    substring: "oza",
    answers: ["FI"],
    question: "Name contains the substring 'oza'",
  },
  {
    substring: "biq",
    answers: ["CA"],
    question: "Name contains the substring 'biq'",
  },
  {
    substring: "iqu",
    answers: ["FR", "BG"],
    question: "Name contains the substring 'iqu'",
  },
  {
    substring: "que",
    answers: ["MZ"],
    question: "Name contains the substring 'que'",
  },
  {
    substring: "oza",
    answers: ["MZ"],
    question: "Name contains the substring 'oza'",
  },
  {
    substring: "biq",
    answers: ["MZ"],
    question: "Name contains the substring 'biq'",
  },
  {
    substring: "iqu",
    answers: ["MZ"],
    question: "Name contains the substring 'iqu'",
  },
  {
    substring: "t",
    answers: ["MZ"],
    question: "Name contains the substring 't'",
  },
];

module.exports = {
  initBaseGameData,
  initCapitalProData,
  initNukePartyData,
  gameType,
  capitialProViewStates,
  initCapitalProPlayerData,
  initNukePartyPlayerData,
  nukePartyViewStates,
  GameViewStates,
  testDataNukeParty,
};
