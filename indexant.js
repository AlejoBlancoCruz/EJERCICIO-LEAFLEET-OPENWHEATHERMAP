window.onload = function () {
    // Carga de Ciudades
    carga_ciudades();
    //Aqui vamos a cargar el mapa en el html con unas coordenadas de prueba inicial
    var map = L.map('mapa').

     setView([27.999041422796825, -15.41840785940124], 14);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    L.control.scale().addTo(map);
    //Herramienta para mostrar un tachuela en una posicion dada por longitud latitud
    L.marker([27.999041422796825, -15.41840785940124], { draggable: true }).addTo(map);
};

function carga_ciudades() {
    fetch("españa.json")
        .then(respuesta => respuesta.json())
        .then(ciudades => {
            let fragmento = document.createDocumentFragment();
            ciudades.forEach((ciudad) => {
                let opcion = document.createElement("option");
                opcion.value = ciudad.coord.lat + "," + ciudad.coord.lon;
                opcion.text = ciudad.name;
                fragmento.appendChild(opcion);

            });
            document.getElementById("ciudad").appendChild(fragmento);
            //console.log(ciudades);
        })
}
document.getElementById("ciudad").addEventListener("change", (event) => {
    var e = document.getElementById("ciudad");
    var value = e.options[e.selectedIndex].value;
    alert(value);

    cambia_ciudad(value);
});
function cambia_ciudad(valor) {
    alert("2.-" + valor);
        var map = L.map('mapa').

        setView([27.999041422796825, -15.41840785940124], 14);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    L.control.scale().addTo(map);
    //Herramienta para mostrar un tachuela en una posicion dada por longitud latitud
    L.marker([valor], { draggable: true }).addTo(map);

}
