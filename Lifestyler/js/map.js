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
		equipementsProximite(map);
}

function	error(err)
{
		alert('Erreur : Géolocalisation refusée : ' + err);
}

function	equipementsProximite(map)
{
	var file = "./json/paris_-_liste_des_equipements_de_proximite_ecoles_piscines_jardins.json";
	var xhttp = new XMLHttpRequest();
	var iconMatern = L.icon({iconUrl: "./icons/icone-maternelle.png"});
	var iconElem = L.icon({iconUrl: "./icons/icone-elementaire.png"});
	var iconCreche = L.icon({iconUrl: "./icons/icone-creche.png"});
	var iconGym = L.icon({iconUrl: "./icons/icone-gym.png"});
	var iconParc = L.icon({iconUrl: "./icons/icone-parc.png"});
	var iconBiblio = L.icon({iconUrl: "./icons/icone-biblio.png"});
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) 
    	{
    		var textDump = xhttp.responseText;
    		var ArrData = JSON.parse(textDump);
    		for (var i = 0; i < ArrData.length; i++)
    		{
    			if (ArrData[i].fields.type_d_equipement === "Ecole maternelle & annexes")
    				L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconMatern}).addTo(map);
				if (ArrData[i].fields.type_d_equipement === "Ecole elementaire & annexes")
					L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconElem}).addTo(map);
				if (ArrData[i].fields.type_d_equipement === "Creche collective")
					L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconCreche}).addTo(map);
				if (ArrData[i].fields.type_d_equipement === "Gymnase")
					L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconGym}).addTo(map);
				if (ArrData[i].fields.type_d_equipement === "Promenade ouverte, mail planté, jardin, square")
					L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconParc}).addTo(map);
				if (ArrData[i].fields.type_d_equipement === "Bibliotheque" || ArrData[i].fields.type_d_equipement === "Mediatheque")
					L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconBiblio}).addTo(map);
    		}
    	}
	};
	xhttp.open("GET", file, true);
	xhttp.send();
}

/*function	etabPolice()
{
	var file = "./json/paris_-_liste_des_equipements_de_proximite_ecoles_piscines_jardins.json";
	var xhttp = new XMLHttpRequest();
	var iconPolice = L.icon({iconUrl: "./icons/icone-police.png"});
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) 
    	{
    		var textDump = xhttp.responseText;
    		var ArrData = JSON.parse(textDump);
    		for (var i = 0; i < ArrData.length; i++)
    		{
    			L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: iconPolice}).addTo(map);
			}
    	}
	};
	xhttp.open("GET", file, true);
	xhttp.send();
}*/