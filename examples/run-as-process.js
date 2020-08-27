const { exec } = require("child_process");
const logStd = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}

const node_modules = '/home/olgerd/.nvm/versions/node/v14.7.0/lib/node_modules'
exec(`${node_modules+'/jscodeshift/bin/jscodeshift.js'} -t remove-consoles.js remove-consoles.input.js -d -p`, logStd);
