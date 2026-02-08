let skip = 0;
const limit = 10;

const contenedorProductos = document.getElementById("contenedor-producto");
const buscarInput = document.getElementById("buscar-productos");
const selectOrdenar = document.getElementById("ordenar");

const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const contenedorNumeros = document.getElementById("numeros-paginacion");

const selectCategorias = document.getElementById("categorias");
let categoriaSeleccionada = "";

let productosActuales = [];


const CargarProducto = () => {

    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (categoriaSeleccionada !== "") {
        url = `https://dummyjson.com/products/category/${categoriaSeleccionada}?limit=${limit}&skip=${skip}`;
    }
    fetch(url)
        .then(respuesta => respuesta.json()) 
        .then(data => {
           
            productosActuales = data.products;
            const productos = productosActuales;
            contenedorProductos.innerHTML = "";

            console.log("Datos recibidos:", productos); 
            actualizarBotones(data.total);
            renderizarNumeros(data.total); 

            productos.forEach(producto => {
       
                const contenedorProducto = document.createElement("div");
                contenedorProducto.classList.add("practice-card");
            
                contenedorProducto.innerHTML = `
                    <h3 class="practice-title">${producto.title}</h3>
                    <img src="${producto.thumbnail}" alt="${producto.title}" width="50%" style="object-fit: contain; height: 100px;">
                    <p><strong>Precio: $</strong> ${producto.price}</p>
                    <p><strong>Categoria:</strong> ${producto.category}</p>
                    <p><strong>Rating:</strong> ${producto.rating}</p>
                    <a href="detalle.html?id=${producto.id}">
                        <button class="btn-Regresar" type="button">Ver detalle</button>
                    </a>

                `;
                contenedorProductos.appendChild(contenedorProducto);
            })
        })
        .catch(error => {
         
            console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
};

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    CargarProducto();
});



buscarInput.addEventListener("input", function() {
    const filtro = buscarInput.value.toLowerCase();
    const tarjetas = contenedorProductos.getElementsByClassName("practice-card");
    Array.from(tarjetas).forEach(function(tarjeta) {
        const titulo = tarjeta.querySelector(".practice-title").textContent.toLowerCase();
        if (titulo.includes(filtro)) {
            tarjeta.style.display = "";
        } else {
            tarjeta.style.display = "none";
        }   
    });
});

function cargarCategorias() {

    fetch("https://dummyjson.com/products/categories")
        .then(res => res.json())
        .then(categorias => {

            selectCategorias.innerHTML = "";

            
            const optionTodas = document.createElement("option");
            optionTodas.value = "";
            optionTodas.textContent = "Todas las categorías";
            selectCategorias.appendChild(optionTodas);

            categorias.forEach(cat => {

                const option = document.createElement("option");

                
                option.value = cat.slug;   
                option.textContent = cat.name;

                selectCategorias.appendChild(option);
            });
        });
}


selectCategorias.addEventListener("change", function () {

    categoriaSeleccionada = this.value;
    skip = 0;
    CargarProducto();
});


btnAnterior.addEventListener("click", () => {
    if (skip > 0) {
        skip -= limit;
        CargarProducto();
    }
});

btnSiguiente.addEventListener("click", () => {
    skip += limit;
    CargarProducto();
});

const actualizarBotones = (total) => {
    btnAnterior.disabled = skip === 0;
    btnSiguiente.disabled = skip + limit >= total;
};


const renderizarNumeros = (total) => {

    contenedorNumeros.innerHTML = "";

    const totalPaginas = Math.ceil(total / limit);
    const paginaActual = (skip / limit) + 1;

    const maxVisible = 5; 
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, paginaActual + 2);

    if (inicio > 1) {
        crearBotonNumero(1, paginaActual);

        if (inicio > 2) {
            const puntos = document.createElement("span");
            puntos.textContent = "...";
            contenedorNumeros.appendChild(puntos);
        }
    }
   
    for (let i = inicio; i <= fin; i++) {
        crearBotonNumero(i, paginaActual);
    }
   
    if (fin < totalPaginas) {

        if (fin < totalPaginas - 1) {
            const puntos = document.createElement("span");
            puntos.textContent = "...";
            contenedorNumeros.appendChild(puntos);
        }

        crearBotonNumero(totalPaginas, paginaActual);
    }
};

function crearBotonNumero(numero, paginaActual) {

    const botonNumero = document.createElement("button");
    botonNumero.textContent = numero;

    if (numero === paginaActual) {
        botonNumero.classList.add("activo");
    }

    botonNumero.addEventListener("click", () => {
        skip = (numero - 1) * limit;
        CargarProducto();
    });

    contenedorNumeros.appendChild(botonNumero);
}

// ORDENAR
selectOrdenar.addEventListener("change", function () {

    let productosOrdenados = [...productosActuales];

    switch (this.value) {

        case "price-asc":
            productosOrdenados.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            productosOrdenados.sort((a, b) => b.price - a.price);
            break;

        case "title-asc":
            productosOrdenados.sort((a, b) => a.title.localeCompare(b.title));
            break;

        case "title-desc":
            productosOrdenados.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }

    renderizarProductos(productosOrdenados);
});

function renderizarProductos(productos) {

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const contenedorProducto = document.createElement("div");
        contenedorProducto.classList.add("practice-card");

        contenedorProducto.innerHTML = `
            <h3 class="practice-title">${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}" 
                 style="width:50%; object-fit:contain; height:100px;">
            <p><strong>Precio:</strong> ${producto.price}</p>
            <p><strong>Categoria:</strong> ${producto.category}</p>
            <p><strong>Rating:</strong> ${producto.rating}</p>
            <a href="detalle.html?id=${producto.id}">
                <button class="btn-Regresar" type="button">Ver detalle</button>
            </a>
        `;

        contenedorProductos.appendChild(contenedorProducto);
    });
}
