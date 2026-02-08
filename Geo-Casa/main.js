let latitud = 21.183426
let longitud = -98.436425 

if(navigator.geolocation) 
{
    navigator.geolocation.getCurrentPosition(

        (posicion)=>{  
         
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
            var polygon = L.polygon([
                [21.183368, -98.436323],
                [21.183512, -98.436241],
                [21.183680, -98.436745],
                [21.183467, -98.436983]

            ]).addTo(map);
            
            //Mensaje
            polygon.bindPopup('<b>Hola, Vivo aqui en Tancazahuela Veracruz:</b> <br> Mis coordenadas son: ' + latitud + ', ' + longitud).openPopup();
        },
        ()=>{}

    )

}
else
{
    alert("El navegador que tiene, no cuenta con geolocalización")
}