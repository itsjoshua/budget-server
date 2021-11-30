const fs = require('fs');
const path = require('path');
const secretDir = "D:\\Workdir\\expts\\secrets";
const keyBuffer = fs.readFileSync(path.join(secretDir, 'secure-session-key'));
const hexString = keyBuffer.toString('hex');
// console.log(hexString);
process.env.COOKIE_KEY = hexString;