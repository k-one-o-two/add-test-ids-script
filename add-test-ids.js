const fs = require("fs");
const path = require("path");
const j = require("jscodeshift");
const { addTestIds } = require("./transforms/jsx-add-data-test-id-attribute");
const { MY_TAGS, HTML_TAGS } = require("./transforms/constants");

/** @typedef {{ source: string; path: string; name: string; }} InputFile*/

const CUSTOM_IO_FOLDER = process.argv
  .find((s) => s.includes("io-dir="))
  ?.split("io-dir=")[1];

const customAttribute = process.argv
  .find((s) => s.includes("customAttribute="))
  ?.split("customAttribute=")[1];

const useAllHtmlTags = process.argv.includes("--all");

const INPUT_FOLDER = path.join(__dirname, CUSTOM_IO_FOLDER || "input");
const OUTPUT_FOLDER = path.join(__dirname, CUSTOM_IO_FOLDER || "output");

const reactFileNaming = /[-_.a-zA-Z]*\.(tsx|jsx)$/;
const testFileNaming = /[-_.a-zA-Z]*\.test\.(tsx|jsx)$/;
const reactExtension = /\.(tsx|jsx)/;
const capitalLetters = /[A-Z]/g;
const htmlSymbolNumber = /&#\d{1,10};/;
const htmlSymbolEntity = /&[a-z]{1,10};/;
const chineseChars = /\p{Script=Han}+/gu;

/* HACK !
* jscodeshift removes html entities such as &nbsp; &emsp; etc.,
*  this solution converts those symbols to UCS-2 Chinese symbols,
*  then converts them back
 */
const registeredSymbols = {};
const toChinese = (symbol) => {
  const encrypted = Buffer.from(symbol).toString("ucs2");
  registeredSymbols[encrypted] = symbol;
  return encrypted;
};

const encryptSymbol = (str) =>
  str.replace(htmlSymbolEntity, toChinese).replace(htmlSymbolNumber, toChinese);

const decryptSymbol = (str) =>
  str.replace(chineseChars, (symbol) => registeredSymbols[symbol]);

const writeFile = (filePath, source) => {
  const folderPath = filePath.replace(reactFileNaming, "");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  fs.writeFileSync(filePath, source, { encoding: "utf-8" });
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
    source: encryptSymbol(
      fs.readFileSync(inputFilePath, { encoding: "utf-8" })
    ),
    path: inputFilePath,
    name: kebabCaseName,
  };

  /** @type {Buffer} */
  const outputSource = addTestIds(
    file,
    j.withParser("tsx"),
    useAllHtmlTags ? HTML_TAGS : MY_TAGS,
    customAttribute
  );
  const outputFilePath = inputFilePath.replace(INPUT_FOLDER, OUTPUT_FOLDER);

  writeFile(outputFilePath, decryptSymbol(outputSource));
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
