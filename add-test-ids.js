const fs = require("fs");
const path = require("path");
const j = require("jscodeshift");
const { addTestIds } = require("./transforms/jsx-add-data-test-id-attribute");
const { MY_TAGS, HTML_TAGS } = require("./transforms/constants");

/** @typedef {{ source: string; path: string; name: string; }} InputFile*/

// EDIT these two to your choice
const INPUT_FOLDER = path.join(__dirname, "../TT/frontend");
const OUTPUT_FOLDER = path.join(__dirname, "../TT/frontend");

const reactFileNaming = /[-_.a-zA-Z]*\.(tsx|jsx)$/;
const testFileNaming = /[-_.a-zA-Z]*\.test\.(tsx|jsx)$/;
const reactExtension = /\.(tsx|jsx)/;
const capitalLetters = /[A-Z]/g;

const writeFile = (filePath, source) => {
  const folderPath = filePath.replace(reactFileNaming, "");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  fs.writeFileSync(filePath, source, { encoding: 'utf-8' });
};

/**
 * @param {string} inputFilePath
 * @return {void}
 * */
const transform = (inputFilePath) => {
  const capitalToMiddleScore = (a, idx) => {
    return `${idx ? "-" : ""}${a.toLowerCase()}`;
  };

  const kebabCaseName = inputFilePath
    .match(reactFileNaming)[0]
    .replace(reactExtension, "")
    .replace(capitalLetters, capitalToMiddleScore);

  /** @type {InputFile} */
  const file = {
    source: fs.readFileSync(inputFilePath, { encoding: "utf-8" }),
    path: inputFilePath,
    name: kebabCaseName,
  };

  // addTestIdsForMyHtmlTags, addTestIdsForNativeHtmlTags - to which html tags tey add test-id's is described in /transforms/constants.js
  /** @type {Buffer} */
  const outputSource = addTestIds(file, j.withParser("tsx"), MY_TAGS);

  const outputFilePath = inputFilePath.replace(INPUT_FOLDER, OUTPUT_FOLDER);
  writeFile(outputFilePath, outputSource);
};

const isFolder = (dir) => fs.lstatSync(dir).isDirectory();
const isReactFile = (dir) => {
  return (
    fs.lstatSync(dir).isFile() &&
    reactFileNaming.test(dir) &&
    !testFileNaming.test(dir)
  );
};

/**
 * @param {string[]} dirs
 * @param {string} parentDir
 * @return {string[]} */
const toAbsolute = (dirs, parentDir = INPUT_FOLDER) => {
  return dirs.map((dir) => path.join(parentDir, dir));
};

const stack = toAbsolute(fs.readdirSync(INPUT_FOLDER));

while (stack.length) {
  const curDir = stack.pop();
  if (isFolder(curDir)) {
    const folders = toAbsolute(fs.readdirSync(curDir), curDir);
    stack.push(...folders);
  }
  if (isReactFile(curDir)) {
    transform(curDir);
  }
}
