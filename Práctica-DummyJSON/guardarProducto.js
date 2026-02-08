document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
});

function cargarCategorias() {
    fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("categoria");
            select.innerHTML = '<option value="">Seleccione una categoría</option>';

            data.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria;
                option.textContent = categoria;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar categorías:", error);
        });
}


const guardarProducto = (producto) => {
   //Creamos las varibales con las que vamos a interactuar

   //Verificamos los tipos de datos, por que en DummyJson ya estan definidos
    const titulo = document.getElementById("titulo").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const descripcion = document.getElementById("descripcion").value;
    const resultado = document.getElementById("mensaje");
    const categoria = document.getElementById("categoria").value;

    resultado.style.display = "block";
    resultado.classList.remove("mensaje-exito", "mensaje-error");

    //Validampos que los elementos no esten vacios
    if(!titulo || !precio || !descripcion || !categoria){
        resultado.classList.add("mensaje-error");
        resultado.textContent = "Por favor, completa todos los campos.";
        return;
    }

    //Creamos el objeto que se va por el body
    const nuevoProducto = {
        title: titulo,
        price: precio,
        category: categoria,
        description: descripcion,
        thumbnail: "https://dummyjson.com/image/400x200/008080/ffffff?text=" + titulo
    };  
   
    //Creamos la peticion fetch
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nuevoProducto})
    })
    .then(res => res.json())
    .then(data => {

        console.log("Respuesta API:", data);
        resultado.classList.add("mensaje-exito");
        resultado.innerHTML = `
        <strong>Producto guardado con exito!</strong><br>
        ID asignado: ${data.id}<br>
        Nombre:     ${data.title}<br>
        Precio:     ${data.price}<br>
        Categoria:  ${data.category}<br>
        Descripcion:    ${data.description}
     `;
    })
    .catch(error => {

        resultado.classList.add("mensaje-error");
        console.error("Error al guardar el producto:", error);
        resultado.textContent = "Hubo un error al guardar el producto. Revisa la consola.";
    });
    
}