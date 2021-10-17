const codeToName = require("./data/minified-code-to-name.json");
const produceCopyableObject = (nameOfGeneratedFile) => {
  let nameMap = [];
  for (let [key, value] of Object.entries(codeToName)) {
    nameMap.push({
      countryCode: key,
      name: value,
      properties: [],
    });
  }

  var json = JSON.stringify(nameMap);

  var fs = require("fs");
  console.log(nameOfGeneratedFile);
  fs.writeFile(`./data/${nameOfGeneratedFile}.json`, json, () =>
    console.log("done")
  );
};

const main = () => {
  if (!process.argv[2]) {
    console.log("bad");
    return;
  }
  produceCopyableObject(process.argv[2]);
};

main();
