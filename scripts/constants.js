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

module.exports = {
  GOOGLE_CLOUD_KEYFILE,
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_CLOUD_KEYFILE_PATH,
  TWO_LETTER_NAME_DATA_NAME,
  TWO_LETTER_NAME_DATA_PATH,
  THREE_LETTER_NAME_DATA_NAME,
  THREE_LETTER_NAME_DATA_PATH,
  defaultBucketName,
};
