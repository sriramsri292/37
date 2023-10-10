const filesystem=require("node:fs");

const fs = require('fs');

const content = new Date().toString();

try {
  fs.writeFileSync('./files/test.txt', content);
  // file written successfully

  try {
    const data = fs.readFileSync('./files/test.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
} catch (err) {
  console.error(err);
}
