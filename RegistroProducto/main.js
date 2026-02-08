const coleccion_docentes = [
    {
        nombre: "Luis Alberto",
        apellidos: "Mendoza San Juan",
        puesto: "Profesor investigador",
        edad: 41,
        Estado: true
    },
    {
        nombre: "med. Efren",
        apellidos: "Juarez Castillo",
        puesto: "Profesor investigador",
        edad: 55,
        Estado: false
    },
    {
        nombre: "Hermes",
        apellidos:"Salazar casanova",
        puesto: "Profesor investigador",
        edad: 43,
        Estado: true
    }
]

const mostrar=()=>{

    //alert(coleccion_docentes[0].nombre)
    //Rescatamos el div que a contener la informacion 

    const contenedor = document.getElementById("contenedor") 

    contenedor.innerHTML = "" //Limpiamos el contenedor LMendoza70
    
    coleccion_docentes.forEach((docente) => {
        if(docente.Estado)
        {
            contenedor.innerHTML += "<div class='tarjeta'>" + "<h2>"+ docente.nombre +"</h2>"+ "</div>"
        } 
    })

    //Instrucciones a fich para solo obtener los datos
}