const codeToName = require("./data/code-to-name.json");

const produceNameToCodeFile = () => {
  var nameToCode = {};
  for (let [key, value] of Object.entries(codeToName)) {
    value = value.replaceAll(" ", "");
    nameToCode[value] = key;
  }
  var json = JSON.stringify(nameToCode);

  var fs = require("fs");
  fs.writeFile("./data/name-to-code.json", json, () => console.log("done"));
};

produceNameToCodeFile();
