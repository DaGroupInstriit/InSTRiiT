// function lolilol(filter)
// {
//     Check si var map est indéfinie
//         initialiser var map
//     Si non
//         Si filter = "maternelle" && document.getElementById('elementaire').checked
//             appeller la fonction afficherMatern(map)
// }
function	choose_category(filter)
{
	$.getScript("map.js", function(){
	   alert("Script loaded but not necessarily executed.");
	});
	if (map)
	{
		if (filter === "matern")
			select_layers(map, "./icons/icone-maternelle.png", "Ecole maternelle & annexes", filter);
		if (filter === "elem")
			select_layers(map, "./icons/icone-elementaire.png", "Ecole elementaire & annexes", filter);
		if (filter === "creche")
			select_layers(map, "./icons/icone-creche.png", "Creche collective", filter);
		if (filter === "gym")
			select_layers(map, "./icons/icone-gym.png", "Gymnase", filter);
		if (filter === "square")
			select_layers(map, "./icons/icone-parc.png", "Promenade ouverte, mail planté, jardin, square", filter);
		if (filter === "bibli")
			select_layers(map, "./icons/icone-biblio.png", "Bibliotheque", filter);
	}

}

function	select_layers(map, icon, type, filter)
{
	if (document.getElementById(filter).checked)
	{
		var file = "./json/paris_-_liste_des_equipements_de_proximite_ecoles_piscines_jardins.json";
		var xhttp = new XMLHttpRequest();
		var my_icon = L.icon({iconUrl: icon});
		xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) 
			{
				var textDump = xhttp.responseText;
				var ArrData = JSON.parse(textDump);
				markers = L.layerGroup();
				for (var i = 0; i < ArrData.length; i++)
	    		{
					if (ArrData[i].fields.type_d_equipement === type)
					{
						var my_layer = L.marker([ArrData[i].geometry.coordinates[1], ArrData[i].geometry.coordinates[0]], {icon: my_icon});
						markers.addLayer(my_layer);
					}
				}
				map.addLayer(markers);
			}
		};
		xhttp.open("GET", file, true);
		xhttp.send();
	}
	else
	{
		map.removeLayer(markers);
	}
}