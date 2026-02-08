let latitud
let longitud

if(navigator.geolocation) 
{
    navigator.geolocation.getCurrentPosition(

        (posicion)=>{  
         
            //Obtenemos la latitud y longitud
            latitud = posicion.coords.latitude
            longitud = posicion.coords.longitude

            //Creamos el arreglo con las coordenadas
            var coordenadasMap = [latitud, longitud]

            //Obtenemos el mapa, el map es el div y le asignamos la vista con las coordenadas y el zoom
            let map= L.map('map').setView(coordenadasMap,16);

            //Agregamos el tileLayer al mapa
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            
            //Poligono
            L.marker(coordenadasMap)
            .addTo(map)
            .bindPopup('<b>Estoy aquí.</b><br>Mis coordenadas son: ' + latitud + ', ' + longitud)
            .openPopup();
            
            var polygon = L.polygon([
                [latitud + 0.0005, longitud - 0.0005],
                [latitud + 0.0005, longitud + 0.0005],
                [latitud - 0.0005, longitud + 0.0005],
                [latitud - 0.0005, longitud - 0.0005]
            ]).addTo(map);
            
            //Mensaje
            polygon.bindPopup('<b>Estoy aqui.</b> <br> Mis coordenadas son: ' + latitud + ', ' + longitud).openPopup();
        },
        ()=>{}

    )

}
else
{
    alert("El navegador que tiene, no cuenta con geolocalización")
}