const path = require("path");
const GOOGLE_CLOUD_PROJECT_ID = "geopro-324602";
const GOOGLE_CLOUD_KEYFILE = "./geopro-324602-2c26a3167767.json";

const GOOGLE_CLOUD_KEYFILE_PATH = path.join(__dirname, GOOGLE_CLOUD_KEYFILE);

const defaultBucketName = "geopro-324602.appspot.com";
const TWO_LETTER_NAME_DATA_NAME = "2-letter-name-data.json";
const TWO_LETTER_NAME_DATA_PATH = path.join(
  __dirname,
  "tmp",
  TWO_LETTER_NAME_DATA_NAME
);

const THREE_LETTER_NAME_DATA_NAME = "3-letter-name-data.json";
const THREE_LETTER_NAME_DATA_PATH = path.join(
  __dirname,
  "tmp",
  THREE_LETTER_NAME_DATA_NAME
);

const FOUR_LETTER_NAME_DATA_NAME = "4-letter-name-data.json";
const FOUR_LETTER_NAME_DATA_PATH = path.join(
  __dirname,
  "tmp",
  FOUR_LETTER_NAME_DATA_NAME
);

const START_TWO_LETTER_NAME_DATA_NAME = "start-2-letter-name-data.json";
const START_TWO_LETTER_NAME_DATA_PATH = path.join(
  __dirname,
  "tmp",
  START_TWO_LETTER_NAME_DATA_NAME
);

const START_THREE_LETTER_NAME_DATA_NAME = "start-3-letter-name-data.json";
const START_THREE_LETTER_NAME_DATA_PATH = path.join(
  __dirname,
  "tmp",
  START_THREE_LETTER_NAME_DATA_NAME
);

const LANGUAGE_QUESTION_NAME = "language-questions.json";
const LANGUAGE_QUESTION_PATH = path.join(
  __dirname,
  "tmp",
  LANGUAGE_QUESTION_NAME
);

const FLAG_DATA_NAME = "flag-data.json";
const FLAG_DATA_PATH = path.join(__dirname, "tmp", FLAG_DATA_NAME);

const flagProperties = {
  GREEN: "green",
  RED: "red",
  BLUE: "blue",
  YELLOW: "yellow",
  ORANGE: "orange",
  WHITE: "white",
  BLACK: "black",
  STRIPES: "stripes",
  STARS: "stars",
  MOON: "moon",
  UNION_JACK: "Union Jack",
};

module.exports = {
  GOOGLE_CLOUD_KEYFILE,
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_CLOUD_KEYFILE_PATH,
  TWO_LETTER_NAME_DATA_NAME,
  TWO_LETTER_NAME_DATA_PATH,
  THREE_LETTER_NAME_DATA_NAME,
  THREE_LETTER_NAME_DATA_PATH,
  START_TWO_LETTER_NAME_DATA_PATH,
  START_TWO_LETTER_NAME_DATA_NAME,
  START_THREE_LETTER_NAME_DATA_PATH,
  START_THREE_LETTER_NAME_DATA_NAME,
  FOUR_LETTER_NAME_DATA_NAME,
  FOUR_LETTER_NAME_DATA_PATH,
  LANGUAGE_QUESTION_NAME,
  LANGUAGE_QUESTION_PATH,
  FLAG_DATA_NAME,
  FLAG_DATA_PATH,
  defaultBucketName,
};
