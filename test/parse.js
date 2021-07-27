const fs = require('fs');
const parser = require('../parser');

function main() {
    const testFile = 'test/data/smalls.cal.html';

    console.log("Reading test file:", testFile);
    var html = fs.readFileSync(testFile, 'utf8');
    var parse = parser.parseHtml(html);
    console.log("Parse:", parse);
}

main();
