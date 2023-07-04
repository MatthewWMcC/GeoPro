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

const nukeStatus = {
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  ORANGE: "ORANGE",
  RED: "RED",
  EXPLODED: "EXPLODED",
};
const guessStatus = {
  CORRECT: "CORRECT",
  WRONG: "WRONG",
  DUPLICATE: "DUPLICATE",
};

const initNukePartyData = {
  usedCountries: [],
  viewState: GameViewStates.WAITING,
  queue: [],
  maxNukeCountdown: 20,
  maxSafeCountdown: 10,
  nukeStatus: nukeStatus.GREEN,
  canGuess: true,
  minPlayers: 1,
};

const initCapitalProPlayerData = {
  score: 0,
  guess: null,
  distance: null,
  addedScore: 0,
};

const initNukePartyPlayerData = {
  lives: 2,
};

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
  nukeStatus,
  guessStatus,
};
