const fs = require('fs');
const cheerio = require('cheerio');

function main() {
    const testFile = 'test/data/smalls.cal.html';

    console.log("Reading test file:", testFile);
    var html = fs.readFileSync(testFile, 'utf8');
    var parse = parseHtml(html);
    console.log("Parse:", parse);
}

function parseHtml(html) {
    const $ = cheerio.load(html);

    var days = $('.day-list');
    console.log("Days Found:", days.toArray().length);
    // Just grab a few days
    days = days.slice(0, 1);
    var parse = [];
    days.each(function(n, day) {
        parse = parse.concat(parseDay($, day));
    });
    return parse;
}

function parseDay($, day) {
    var title = $('.title1', day)[0];
    var date = title.firstChild.data.trim();
    //console.log(date);
    var events = $('.day-event', day);
    console.log("Events found:", events.toArray().length);
    var parse = [];
    events.each(function(n, event) {
        parse = parse.concat(parseEvent($, event, date));
    });
    return parse;
}

function parseEvent($, event, date = "unspecified") {
    var texts = $('div.text2', event);
    console.log("Texts found:", texts.toArray().length);
    var eventText = {
        who: "Unknown",
        where: "Unknown",
        date: date,
        time: "Unknown",
    };
    texts.each(function(n, text) {
        var data = text.firstChild.data;
        //console.log("Text:", data);
        if (n == 0) eventText.where = data;
        if (n == 1) eventText.time = data;
        if (n == 2) eventText.who = data;
    });
    return [ eventText ];
}

main();
