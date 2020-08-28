# This tool adds data-test-id's to react files (jsx, tsx)
### How to use:
1) do `npm i`
2)  * run it using `npm run start` or just `node add-test-ids.js`
    * run using custom a directory `npm run start:custom io-dir=../my/react-app`
    * run using custom a directory & assign test-id's to all html tags 
`npm run start:custom io-dir=../my/react-app --all`
    * or by changing variables `INPUT_FOLDER`, `OUTPUT_FOLDER` to point to your input & output destination
(files can be overridden, so the input & output paths can be the same)
    * or you can copy-paste a `.jsx/.tsx` file to `/input` folder, then do `npm run start` 
