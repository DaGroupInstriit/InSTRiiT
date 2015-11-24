function init(){
	L.mapbox.accessToken = 'pk.eyJ1Ijoic3VwZXJvdW1hbiIsImEiOiJjaWhkZG9jMzEwMDFtdHhtNGdydnFkd2h3In0.OlnqvMNSYGWYvAK9JQs8Zg';
	// Replace 'mapbox.streets' with your map id.
	var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/superouman.o8eed0e9/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
	});

	var map = L.map('map')
    	.addLayer(mapboxTiles)
    	.setView([48.848, 2.334], 11);
}

