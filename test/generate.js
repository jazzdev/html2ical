const fs = require('fs');
const parser = require('../parser');
const generator = require('../generator');

function main() {
    const testFile = 'test/data/smalls.cal.html';

    console.log("Reading test file:", testFile);
    var html = fs.readFileSync(testFile, 'utf8');
    var parse = parser.parseHtml(html);
    console.log(generator.generateCal(parse));
}

main();
