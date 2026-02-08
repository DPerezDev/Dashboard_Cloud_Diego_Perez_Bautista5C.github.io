// editar.js: estilo y comportamiento alineado con agregar.js

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

const cargarProducto = () => {
    if(!id) return;
    fetch('https://dummyjson.com/products/' + id)
    .then(res => res.json())
    .then(producto => {
        document.getElementById('titulo').value = producto.title || '';
        document.getElementById('precio').value = producto.price || '';
        document.getElementById('descripcion').value = producto.description || '';
        document.getElementById('categoria').value = producto.category || 'smartphones';
        document.getElementById('imagen').value = (producto.images && producto.images[0]) || producto.thumbnail || '';
    })
    .catch(err => console.error('Error al cargar producto', err));
}

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


const editarProducto = () => {
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').value;
    const cajaMensaje = document.getElementById('mensaje');

    cajaMensaje.style.display = "block";
    cajaMensaje.classList.remove("mensaje-exito", "mensaje-error");

    if(!titulo || !precio || !descripcion){
        cajaMensaje.classList.add("mensaje-error");
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // Preparar objeto con los datos editados
    const productoActualizado = {
        title: titulo,
        price: parseFloat(precio),
        category: categoria,
        description: descripcion
    };
    if(imagen) productoActualizado.thumbnail = imagen;

    // Realizar PUT a la API de DummyJSON para actualizar el producto
    fetch('https://dummyjson.com/products/' + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productoActualizado)
    })
    .then(respuesta => respuesta.json())
    .then(productoActualizado => {
        console.log("Respuesta API:", productoActualizado);
        cajaMensaje.classList.add("mensaje-exito");
        cajaMensaje.innerHTML = `
            <strong>¡Producto actualizado!</strong><br>
            ID: ${productoActualizado.id}<br>
            Producto: ${productoActualizado.title}<br>
            <small>Nota: Al ser una API de prueba, los cambios no se guardaron realmente en el servidor, pero la simulación fue exitosa.</small>
        `;

        setTimeout(()=>{ window.location.href = `detalle.html?id=${id}` },2000);
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        cajaMensaje.classList.add("mensaje-error");
        cajaMensaje.innerHTML = 'Error al actualizar el producto.';
    });
}

// iniciar
cargarProducto();