const node_modules = '/home/olgerd/.nvm/versions/node/v14.7.0/lib/node_modules'
const path = require('path')
const outputFolder = path.join(__dirname, 'output')
const j = require(node_modules + '/jscodeshift/index.js');
const fs = require('fs')

const source = fs.readFileSync('./input/remove-consoles.input.js', { encoding: "utf8" })
const root = j(source)
const callExpressions = root.find(j.CallExpression, {
  callee: {
    type: 'MemberExpression',
    object: { type: 'Identifier', name: 'console' },
  },
});
const withoutConsoleLogs = callExpressions.remove().toSource()
fs.writeFileSync(path.join(outputFolder, 'withoutLogs.js'), Buffer.from(withoutConsoleLogs, 'binary'))

console.log(root)

