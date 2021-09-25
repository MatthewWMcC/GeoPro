var fs = require("fs");
const { uploadFile } = require("./storage");
// const codeToName = require("./data/code-to-name.json");
const codeToName = require("./data/minified-code-to-name.json");
const {
  THREE_LETTER_NAME_DATA_PATH,
  THREE_LETTER_NAME_DATA_NAME,
  TWO_LETTER_NAME_DATA_PATH,
  TWO_LETTER_NAME_DATA_NAME,
  START_TWO_LETTER_NAME_DATA_PATH,
  START_TWO_LETTER_NAME_DATA_NAME,
  START_THREE_LETTER_NAME_DATA_PATH,
  START_THREE_LETTER_NAME_DATA_NAME,
  FOUR_LETTER_NAME_DATA_PATH,
  FOUR_LETTER_NAME_DATA_NAME,
  FLAG_DATA_PATH,
  FLAG_DATA_NAME,
} = require("./constants");

const generate4LetterNameQuestions = async () => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.toLowerCase();
    for (let i = 0; i < value.length - 3; i++) {
      if (
        value[i] === " " ||
        value[i + 1] === " " ||
        value[i + 2] === " " ||
        value[i + 3] === " "
      ) {
      } else {
        const substring = value[i] + value[i + 1] + value[i + 2] + value[i + 3];
        const j = nameMap.findIndex((obj) => obj.substring === substring);
        if (j >= 0) {
          nameMap[j].answers.push(key);
        } else {
          nameMap.push({
            substring,
            answers: [key],
            question: "Name contains the substring '" + substring + "'",
          });
        }
      }
    }
  }

  nameMap.sort(sortFunction);

  const json = JSON.stringify(nameMap);
  fs.writeFile(FOUR_LETTER_NAME_DATA_PATH, json, () => {
    uploadFile(
      FOUR_LETTER_NAME_DATA_PATH,
      `data/${FOUR_LETTER_NAME_DATA_NAME}`
    );
    console.log("done");
  });
};

const generate3LetterNameQuestions = async () => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.toLowerCase();
    for (let i = 0; i < value.length - 2; i++) {
      if (value[i] === " " || value[i + 1] === " " || value[i + 2] === " ") {
      } else {
        const substring = value[i] + value[i + 1] + value[i + 2];
        const j = nameMap.findIndex((obj) => obj.substring === substring);
        if (j >= 0) {
          nameMap[j].answers.push(key);
        } else {
          nameMap.push({
            substring,
            answers: [key],
            question: "Name contains the substring '" + substring + "'",
          });
        }
      }
    }
  }

  nameMap.sort(sortFunction);

  const json = JSON.stringify(nameMap);
  fs.writeFile(THREE_LETTER_NAME_DATA_PATH, json, () => {
    uploadFile(
      THREE_LETTER_NAME_DATA_PATH,
      `data/${THREE_LETTER_NAME_DATA_NAME}`
    );
    console.log("done");
  });
};

const generate2LetterNameQuestions = async () => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.toLowerCase();
    for (let i = 0; i < value.length - 1; i++) {
      if (value[i] === " " || value[i + 1] === " ") {
      } else {
        const substring = value[i] + value[i + 1];
        const j = nameMap.findIndex((obj) => obj.substring === substring);
        if (j >= 0) {
          nameMap[j].answers.push(key);
        } else {
          nameMap.push({
            substring,
            answers: [key],
            question: "Name contains the substring '" + substring + "'",
          });
        }
      }
    }
  }
  nameMap.sort(sortFunction);
  const json = JSON.stringify(nameMap);
  fs.writeFile(TWO_LETTER_NAME_DATA_PATH, json, () => {
    uploadFile(TWO_LETTER_NAME_DATA_PATH, `data/${TWO_LETTER_NAME_DATA_NAME}`);
    console.log("done");
  });
};

const generate2StartLetterNameQuestions = async () => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.toLowerCase();
    if (value[0] === " " || value[1] === " ") {
    } else {
      const substring = value[0].toUpperCase() + value[1];
      const j = nameMap.findIndex((obj) => obj.substring === substring);
      if (j >= 0) {
        nameMap[j].answers.push(key);
      } else {
        nameMap.push({
          substring,
          answers: [key],
          question: "Name starts with '" + substring + "'",
        });
      }
    }
    // }
  }

  nameMap.sort(sortFunction);

  const json = JSON.stringify(nameMap);
  fs.writeFile(START_TWO_LETTER_NAME_DATA_PATH, json, () => {
    uploadFile(
      START_TWO_LETTER_NAME_DATA_PATH,
      `data/${START_TWO_LETTER_NAME_DATA_NAME}`
    );
    console.log("done");
  });
};

const generate3StartLetterNameQuestions = async () => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.toLowerCase();
    if (value[0] === " " || value[1] === " " || value[2] === " ") {
    } else {
      const substring = value[0].toUpperCase() + value[1] + value[2];
      const j = nameMap.findIndex((obj) => obj.substring === substring);
      if (j >= 0) {
        nameMap[j].answers.push(key);
      } else {
        nameMap.push({
          substring,
          answers: [key],
          question: "Name starts with '" + substring + "'",
        });
      }
    }
    // }
  }

  nameMap.sort(sortFunction);

  const json = JSON.stringify(nameMap);
  fs.writeFile(START_THREE_LETTER_NAME_DATA_PATH, json, () => {
    uploadFile(
      START_THREE_LETTER_NAME_DATA_PATH,
      `data/${START_THREE_LETTER_NAME_DATA_NAME}`
    );
    console.log("done");
  });
};

const generateFlagsQuestions = async () => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.toLowerCase();
    nameMap.push({
      answers: [key],
      question: "Has the following flag?",
      imageSrc: `https://www.countryflags.io/${key}/flat/64.png`,
    });
  }

  const json = JSON.stringify(nameMap);
  fs.writeFile(FLAG_DATA_PATH, json, () => {
    uploadFile(FLAG_DATA_PATH, `data/${FLAG_DATA_NAME}`);
    console.log("done");
  });
};

const sortFunction = (a, b) => {
  return a.answers.length > b.answers.length
    ? -1
    : a.answers.length < b.answers.length
    ? 1
    : 0;
};

const main = () => {
  generate3LetterNameQuestions();
  generate2LetterNameQuestions();
  generate4LetterNameQuestions();
  generate3StartLetterNameQuestions();
  generate2StartLetterNameQuestions();
  generateFlagsQuestions();
};

main();
