// Generate iCalendar format from parsed events

/*
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:uid1@example.com (required)
DTSTAMP:19970714T170000Z (required - DATE-TIME that iCalendar object was created.)
DTSTART:19970714T170000Z (required)
DTEND:19970715T035959Z (this or DURATION is required)
DURATION:PT5H30M (5 hours, 30 minutes - both minutes and hours are optional)
SUMMARY:Bastille Day Party (optional)
DESCRIPTION: (optional)
END:VEVENT
END:VCALENDAR
*/

function generateCal(parsedEvents, domain = "example.com", tz = "PST") {
    var sb = [];
    sb.push('BEGIN:VCALENDAR');
    parsedEvents.forEach((event, n) => {
        sb.push('BEGIN:VEVENT');
        sb.push('UID:' + mkID(event.date, n, domain));
        sb.push('DTSTAMP:' + mkISO8601Time(new Date()));
        sb.push('DTSTART:' + mkStartTime(event, tz));
        sb.push('DURATION:PT1H');
        sb.push('SUMMARY:' + event.who.trim());
        sb.push('LOCATION:' + event.where.trim());
        sb.push('END:VEVENT');
    });
    sb.push('END:VCALENDAR');
    return sb.join("\n");
}

function mkID(date, count, domain) {
    return [
        date.replace(' ',''),
        '.E',
        count,
        '@',
        domain
    ].join("");
}

function mkISO8601Time(date) {
    return date.toISOString().slice(0,19).replace(/[-: ]/g, "") + 'Z';
}

function mkStartTime(event, tz) {
    var now = new Date();
    var dateString = [
        now.getYear() + 1900,
        ' ',
        event.date.replace(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/,''),
        ' ',
        event.time.replace(/-.*/,''), // Ignore end time
        ' ',
        now.toString().indexOf("Daylight") == -1 ? tz : tz.replace("S", "D")
    ].join("");
    var date = Date.parse(dateString);
    if (!date) {
        console.error("dateString", dateString);
        console.error("date", date);
        return dateString;
    }
    date = new Date(date);
    if (date.getHours() == 21) {
        console.error("Adjusting midnight");
        date.setDate(date.getDate() + 1);
    }
    return mkISO8601Time(date);
}

exports.generateCal = generateCal;
