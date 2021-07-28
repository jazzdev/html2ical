~/cal/smalls.ics : html
	node test/generate.js > $@
html : 
	curl https://www.smallslive.com/events/calendar/ > test/data/smalls.cal.html
