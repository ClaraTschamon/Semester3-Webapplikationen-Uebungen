//Clara Tschamon

var map = L.map('map').setView([0, 0], 1);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var myAPIkey = "AAPK3b399b66352e4bc4be8ad70f2b57305c5Plb5mqb2ZAWrWs5K4ogRSb-VtQ4uQtDYALUqeQzEStRB6h4u7eG2blVd2JXX1ko"

var eventList = document.getElementById('eventList');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        //var itemsContainer = document.createElement('DIV');

        if (data.status === 'ok') {
            //var events = data.items.slice(0, 10);

            for (var i = 0; i < 10; i++) {
                var event = data.items[i];
                console.log(event)
                var eventTitle = event.title;
                var eventDescription = event.description

                var eventListItem = document.createElement('li');
                eventListItem.innerHTML = eventTitle + '<br/>' + eventDescription + '<br/>' + '<br/>';

                eventList.appendChild(eventListItem);
            }

            eventList.addEventListener('click', function (e) {

                var element = e.target;
                var index = Array.prototype.indexOf.call(element.parentNode.children, element);
                console.log(index);

                var event = data.items[index]
                console.log(event)

                const regExp = /Ort: \d+ ([\wöäüÖÄÜß -]*)<br>Land: ([\wöäüÖÄÜß -]*)/gm;
                var location = regExp.exec(event.description);

                var locationArray = [];
                locationArray.push(location[1])
                locationArray.push(location[2])
                let loc = locationArray.toString();
                console.log(loc)

                L.esri.Geocoding.geocode({apikey: myAPIkey}).text(loc)
                    .run(function (err, results, response) {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        const result = results.results[0]
                        console.log(result)

                        var lat = results.results[0].latlng.lat
                        var lng = results.results[0].latlng.lng

                        // set the view of the map on the new location
                        map.setView([lat, lng], 12);

                        L.marker([lat, lng])
                            .addTo(map)
                            .bindPopup(loc)
                            .openPopup();
                    });
            });
        }
    }
}


xhr.open(
    'GET',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.festivalticker.de%2Frss-festivalfeed%2Ffestivals-int.xml',
    true
);
xhr.send();
