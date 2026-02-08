// Definimos la URL de la API oficial de Dragon Ball
const urlApi = "https://grupoctic.com/comercializadorall/ComercializadoraLL/API/apiProductos(1).php";

// Función asíncrona para pedir los datos
const cargarProductos = () => {
    
    
    fetch(urlApi)
        .then(respuesta => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
        .then(data => {
            // La API devuelve un objeto con una propiedad 'items' que contiene el array
            const productos = data;
           
            console.log("Datos recibidos:", productos); // Debugging en consola
           
            // Llamamos a la función que se encarga de dibujar en pantalla
            mostrarProductos(productos);
        })
        .catch(error => {
            // Buena práctica: Manejar errores por si falla la red o la API
            console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
}

// Función encargada de manipular el DOM
const mostrarProductos = (productos) => {
    // 1. Seleccionamos el contenedor del HTML
    const contenedorProducto = document.getElementById("contenedor-productos");
   
    // 2. Limpiamos el contenedor por si ya tenía contenido previo
    contenedorProducto.innerHTML = "";

    // 3. Recorremos cada producto del array
    productos.forEach(producto => {
        // Creamos un elemento DIV nuevo en memoria
        const tarjeta = document.createElement("div");
       
        // Le añadimos la clase CSS que definimos en el paso 3
        tarjeta.classList.add("practice-card");

       const img = "https://grupoctic.com/comercializadorall/ComercializadoraLL/img/";

     
        tarjeta.innerHTML = `
            <img src="${img + producto.Imagen}" alt="${producto.Nombre}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="practice-title">${producto.Nombre}</h3>
            <p class="practice-description">${producto.Descripcion}</p>
            <p><strong>Precio:</strong> ${producto.Precio}</p>
            <p class="activo"><strong>Stock:</strong> ${producto.Stock}</p>
            <button class="comprar">Comprar</button>
        `;
       
        // Finalmente, agregamos la tarjeta completa al contenedor principal
        contenedorProducto.appendChild(tarjeta);
    })
}