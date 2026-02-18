const cloudname="dnu57rgek"
const preset="Precet_5C"  

const input = document.getElementById("fileinput");
const button = document.getElementById("uploadBtn");
const statusText = document.getElementById("status");
const preview = document.getElementById("preview");

button.addEventListener("click", function () {

    const file = input.files[0];

    // Validación si no selecciona archivo
    if (!file) {
        statusText.textContent = "Selecciona una imagen primero.";
        statusText.style.color = "red";
        return;
    }

    // Validación de tipo
    if (!file.type.startsWith("image/")) {
        statusText.textContent = "El archivo debe ser una imagen.";
        statusText.style.color = "red";
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    button.disabled = true;
    statusText.textContent = "Subiendo...";
    statusText.style.color = "black";

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: "POST",
        body: formData
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Error en la subida");
        }
        return response.json();
    })
    .then(function (data) {

        statusText.textContent = "Imagen subida correctamente.";
        statusText.style.color = "green";

        preview.src = data.secure_url;

        button.disabled = false;
    })
    .catch(function (error) {

        statusText.textContent = "Ocurrió un error al subir la imagen.";
        statusText.style.color = "red";

        button.disabled = false;
    });

});
