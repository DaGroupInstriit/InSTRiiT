function init(){
  var map = L.map('map').setView([48.505, 2.09], 13);
  var test = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={pk.eyJ1Ijoic3VwZXJvdW1hbiIsImEiOiJjaWhkZG9jMzEwMDFtdHhtNGdydnFkd2h3In0.OlnqvMNSYGWYvAK9JQs8Zg}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'superouman.testmap',
    accessToken: 'pk.eyJ1Ijoic3VwZXJvdW1hbiIsImEiOiJjaWhkZnY5MjUwMDF6djFtOXp4Y2FuMWtxIn0.CYwKPlSVunpIyX1A5sMPfg'
}).addTo(map);
}

