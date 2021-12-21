// Parse calendar data from HTML

const cheerio = require('cheerio');

function parseHtml(html, numDaysToParse = 7) {
    const $ = cheerio.load(html);

    var days = $('.day-list');
    console.error("Days Found:", days.toArray().length);
    // Just grab a few days
    days = days.slice(0, numDaysToParse);
    var parse = [];
    days.each(function(n, day) {
        parse = parse.concat(parseDay($, day));
    });
    return parse;
}

function parseDay($, day) {
    var title = $('.title1', day)[0];
    var date = title.firstChild.data.trim();
    //console.error(date);
    var events = $('.day-event', day);
    console.error("Events found:", events.toArray().length);
    var parse = [];
    events.each(function(n, event) {
        parse = parse.concat(parseEvent($, event, date));
    });
    return parse;
}

function parseEvent($, event, date = "unspecified") {
    var texts = $('div.text2', event);
    console.error("Texts found:", texts.toArray().length);
    var eventText = {
        who: "Unknown",
        where: "Unknown",
        date: date,
        time: "Unknown",
    };
    texts.each(function(n, text) {
        var data = text.firstChild.data;
        //console.error("Text:", data);
        if (n == 0) eventText.where = data;
        if (n == 1) eventText.time = data;
        if (n == 2) eventText.who = data;
    });
    var parse = [ eventText ];
    if (eventText.time.indexOf('&') > -1) {
        var times = eventText.time.split('&');
        eventText.time = times[0];
        parse.push({...eventText, time: times[1]});
        // ToDo: Handle more than one ampersand
    }
    return parse;
}

exports.parseHtml = parseHtml;
