const urlApi = "https://dummyjson.com/products";
const contenedorProductos = document.getElementById("contenedor-producto");

const guardarIdEnInput = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    document.getElementById("producto-id").value = id;
};

const EncontraProducto = () => {
    
    const id = document.getElementById("producto-id").value;

    fetch(urlApi)
        .then(respuesta => respuesta.json()) 
        .then(data => {
          
            const productos = data.products;
            console.log("Datos recibidos:", productos); 
            productos.forEach(producto => {
                if (producto.id == id) {
       
                    const contenedorProducto = document.createElement("div");
                    contenedorProducto.classList.add("practice-card-detalle");
                    
                    contenedorProducto.innerHTML = `
                        <h2 class="practice-title-main">${producto.title}</h2>

                        <img src="${producto.thumbnail}" 
                            alt="${producto.title}" 
                            class="detalle-img">

                        <p class="detalle-precio">$${producto.price}</p>

                        <div class="detalle-info-secundaria">
                            <span><strong>Marca:</strong> ${producto.brand}</span>
                            <span><strong>Stock:</strong> ${producto.stock} disponibles</span>
                        </div>

                        <p class="detalle-descripcion">
                            ${producto.description}
                        </p>

                        <div class="detalle-botones">
                            <a href="index.html">
                                <button class="btn-Regresar" type="button">Volver a productos</button>
                            </a>

                            <a href="editar.html?id=${producto.id}">
                                <button class="btn-back" type="button">Editar</button>
                            </a>

                            <button class="btn-Eliminar" 
                                    onclick="eliminarProducto(${producto.id})" 
                                    type="button">
                                Eliminar
                            </button>
                        </div>

                        <div class="separador-opiniones"></div>

                        <h3 class="titulo-opiniones">Reseñas de clientes</h3>

                        <div id="contenedor-opiniones"></div>
                    `;
                    contenedorProductos.appendChild(contenedorProducto);
                    OpinionesProduc(producto);
                }
            })
        })
        .catch(error => {
         
            console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
};

const OpinionesProduc = (producto) => {
    const contenedorOpiniones = document.getElementById("contenedor-opiniones");
    contenedorOpiniones.innerHTML = "";

    producto.reviews.forEach(opinion => {

        const estrellas = '<i class="fa-solid fa-star"></i>'.repeat(opinion.rating);
        const contenedorOpinion = document.createElement("div");
        contenedorOpinion.classList.add("practice-card-opinion");

        contenedorOpinion.innerHTML = `
            <div class="opinion-header">
                <strong>${opinion.reviewerName}</strong>
                <p class="comentario">${opinion.comment}</p>
                <span class="rating">${estrellas}</span>
            </div>
            
        
        `;
        contenedorOpiniones.appendChild(contenedorOpinion);
    });
};

const eliminarProducto = (id) => {

    const confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");

    if (!confirmar) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {

        alert("Producto eliminado correctamente.");

        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al eliminar el producto.");
    });
};



document.addEventListener("DOMContentLoaded", () => {
    guardarIdEnInput();
    EncontraProducto();
});

