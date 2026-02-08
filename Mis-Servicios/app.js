
const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];

const cargarServicios=()=>{

    const contenedor = document.getElementById("contenedor-servicios") 
    contenedor.innerHTML = ""
    
    baseDeDatosCloud.forEach((datos) => {
        if(datos.estado == "Activo")
        {
            contenedor.innerHTML+= 
            `<div class='card'>  
                <h2> ${datos.nombre }</h2> 
                <p class= 'tipo'>Tipo: ${datos.tipo }</p>
                <p>Costo:${datos.costo}</p>
                <p class='activo'>Estado:${datos.estado}</p>
            </div>`;
        } 
        else
        {
            contenedor.innerHTML+= 
            `<div class='card'>  
                <h2> ${datos.nombre }</h2> 
                <p class= 'tipo'>Tipo: ${datos.tipo }</p>
                <p>Costo:${datos.costo}</p>
                <p class='inactivo'>Estado:${datos.estado}</p>
            </div>`;
        }
    })

   
}