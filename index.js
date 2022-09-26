window.onload = function () {
    //Carga de ciudades
    carga_ciudades();

    //Aqui vamos a cargar el mapa en el html con unas coordenadas de prueba inicial

};

function carga_ciudades() {
    let ciudad = document.getElementById("ciudad");

    fetch("españa.json")
        .then(respuesta => respuesta.json())
        .then(ciudades => {
            ciudades.sort();
            ciudades.reverse();
            let fragmento = document.createDocumentFragment();
            ciudades.forEach((ciudad) => {
                let opcion = document.createElement("option");
                opcion.value = ciudad.coord.lat + "," + ciudad.coord.lon;
                opcion.text = ciudad.name;
                fragmento.appendChild(opcion);
            })
            ciudad.appendChild(fragmento);
            console.log(ciudad.options[0]);
            cambia_ciudad(ciudad.options[0].text, ciudad.options[0].value);
        })
}

document.getElementById("ciudad").addEventListener("change", () => {
    let ciudad = document.getElementById("ciudad")
    cambia_ciudad(ciudad.options[ciudad.selectedIndex].text, ciudad.options[ciudad.selectedIndex].value);
});

function cambia_ciudad(nomciudad, lonlat) {
    let vector = lonlat.split(',');
    document.getElementById("eleccion").innerHTML = nomciudad;
    document.getElementById("longitud").innerHTML = vector[0];
    document.getElementById("latitud").innerHTML = vector[1];
    // Aqui va la conexion con wheathermap para obtener el clima del lugar
    let clave = '425cca1e8df28e4963dcc36cb497a33e';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + nomciudad + ',ES&units=metric&APPID=' + clave + '&lang=es';
    console.log(url);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let fragmento = document.createDocumentFragment();
            let division = document.createElement("div"); 
            let titulo = document.createElement("label");
            titulo.innerHTML ="Temperatura:";
            division.appendChild(titulo);

            let temperatura = document.createElement("span");
            temperatura.innerHTML=datos.main.temp + " Grados Centigrados";
            division.appendChild(temperatura);
            fragmento.appendChild(division);

          
            titulo = document.createElement("label");
            titulo.innerHTML ="Temperatura Máxima:";
            division.appendChild(titulo);

            temperatura = document.createElement("span");
            temperatura.innerHTML=datos.main.temp_max + " Grados Centigrados";
            division.appendChild(temperatura);
            fragmento.appendChild(division);
            
            titulo = document.createElement("label");
            titulo.innerHTML ="Temperatura Míxima:";
            division.appendChild(titulo);

            temperatura = document.createElement("span");
            temperatura.innerHTML=datos.main.temp_min + " Grados Centigrados";
            division.appendChild(temperatura);
            fragmento.appendChild(division);

            titulo = document.createElement("label");
            titulo.innerHTML ="Humedad:";
            division.appendChild(titulo);

            temperatura = document.createElement("span");
            temperatura.innerHTML=datos.main.humidity + "%";
            division.appendChild(temperatura);
            fragmento.appendChild(division);

            titulo = document.createElement("label");
            titulo.innerHTML ="Pronostico:";
            division.className="pronost";
            division.appendChild(titulo);

            temperatura = document.createElement("span");
            temperatura.innerHTML=datos.weather[0].description;
            

            let imagen = document.createElement("img");
            imagen.src ="http://openweathermap.org/img/w/" + datos.weather[0].icon + ".png";
            imagen.className="iconito";    
            temperatura.appendChild(imagen);
            division.appendChild(temperatura);

            fragmento.appendChild(division);

            /* let imagen = document.createElement("img");
            imagen.src ="http://openweathermap.org/img/w/" + datos.weather[0].icon + ".png";
            imagen.className="iconito";
            fragmento.appendChild(imagen);  */

            document.getElementById("clima").innerHTML="";
            document.getElementById("clima").appendChild(fragmento);
            console.log(datos);
        })
    // aqui va el mapa

    document.getElementById('weathermapa').innerHTML = "<div id='mapa'></div>";
    var map = L.map('mapa').

        setView(vector, 30);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    //Agrega el control de escala al mapa
    L.control.scale().addTo(map);

    //Herramienta para mostrar una chincheta en una posicion dada por longitud latitud
    L.marker(vector, { draggable: true }).addTo(map);
    console.log(vector);
    console.log(nomciudad);
}