function	init()
{
	L.mapbox.accessToken = 'pk.eyJ1Ijoic3VwZXJvdW1hbiIsImEiOiJjaWhkZG9jMzEwMDFtdHhtNGdydnFkd2h3In0.OlnqvMNSYGWYvAK9JQs8Zg';
	var		mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/superouman.o8eed0e9/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
	});
	if ('geolocation' in navigator)
	{
		requestLocation();
	}
	else
	{
		var map = L.map('map').addLayer(mapboxTiles).setView([48.848, 2.334], 11);
	}
}

function	requestLocation()
{
	var		options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	}
	
	navigator.geolocation.getCurrentPosition(success, error, options);
}

function	success(pos)
{
		var		lng = pos.coords.longitude;
		var		lat = pos.coords.latitude;
		var		mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/superouman.o8eed0e9/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
  					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
					});
		var		map = L.map('map').addLayer(mapboxTiles).setView([lat, lng], 15);
		var		marker = L.marker([lat, lng]).addTo(map);
		var		circle = L.circle([lat, lng], 500, {
					color: '#ff0000',
		    		fillColor: '#f03',
		    		fillOpacity: 0.2
					}).addTo(map);
		accessJson(map);
}

function	error(err)
{
		alert('Erreur : Géolocalisation refusée : ' + err);
}

function	accessJson(map)
{
	var file = "paris_-_liste_des_equipements_de_proximite_ecoles_piscines_jardins.json";
	var xhttp = new XMLHttpRequest();
	//var i;
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) 
    	{
    		var textDump = xhttp.responseText;
    		var ArrData = JSON.parse(textDump);
    		document.getElementById("affiche").innerHTML = ArrData[19].fields.wgs84;
    		L.marker([48.848, 2.334]).addTo(map);
    		L.marker([ArrData[0].fields.wgs84[0], ArrData[0].fields.wgs84[1]]).addTo(map);
    		for (i = 0; i < ArrData.length; i++)
    		{
    			L.marker([ArrData[i].fields.wgs84[0], ArrData[i].fields.wgs84[1]]).addTo(map);
    		}
    	}
	};
	xhttp.open("GET", file, true);
	xhttp.send();
}