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

function generateCal(parsedEvents, domain = "example.com") {
		var sb = [];
		sb.push('BEGIN:VCALENDAR');
		parsedEvents.forEach((event, n) => {
				sb.push('BEGIN:VEVENT');
				sb.push('UID:' + mkID(event.date, n, domain));
				sb.push('END:VEVENT');
		});
		sb.push('END:VCALENDAR');
		return sb.join("\n");
}

function mkID(date, count, domain) {
		return [
				date.replaceAll(' ',''),
				'.E',
				count,
				'@',
				domain
		].join("");
}

exports.generateCal = generateCal;
