//APi que pertenece a los navegadores
//Siempre apuntan al parrafo o el enlace
const coordenadas = document.getElementById("parrafo");
const enlaceMapa = document.getElementById("enlace");

const obtener=() => 
{
    //Verificamos si el navegador soporta la geolocalización
    if(navigator.geolocation) //Podemos accede hasta componentes del equipo como la RAM
    {
        coordenadas.innerHTML = "Localizando...";
        //Llamamos a la función getCurrentPosition que obtiene la posición actual
        navigator.geolocation.getCurrentPosition
        (
            (posición)=>    //Primer parametro: función que se ejecuta si todo va bien
            {
                const longitud= posición.coords.longitude;
                const latitud = posición.coords.latitude;

                //alert(`Latitud: ${latitud}, Longitud: ${longitud}`);
               coordenadas.innerHTML=`Latitud: (${latitud} )°, Longitud: (${longitud} )°`;

               //Mostramos el enlace al mapa
               enlaceMapa.style.display="block";
               enlaceMapa.href=`https://www.google.com/maps/?q=${latitud},${longitud}`;
               
            },      
            (error)=> //Segundo parametro: función que se ejecuta si hay un error
            {
                coordenadas.innerText= `Error al obtener la ubicación`;
            }
        ) 
        
        //Metodo getCurrentPosition recibe una función como parámetro
    }
    else
    {

    }

}