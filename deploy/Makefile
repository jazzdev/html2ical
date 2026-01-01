~/cal/smalls.ics : html
	node test/generate.js > $@
html :
	echo "<div>" > test/data/smalls.cal.html
	curl 'https://www.smallslive.com/search/upcoming-ajax/?page=1&venue=all' | jq -r .template >> test/data/smalls.cal.html
	echo "</div>" >> test/data/smalls.cal.html
