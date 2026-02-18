const cloudname = "dnu57rgek";
const preset = "Precet_5C";

const input = document.getElementById("fileinput");
const button = document.getElementById("uploadBtn");
const statusText = document.getElementById("status");
const preview = document.getElementById("preview");
const newImageBtn = document.getElementById("newImageBtn");
const transformSelect = document.getElementById("transformSelect");

let uploadedImageUrl = "";

// Previsualización local
input.addEventListener("change", function () {
    const file = input.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Subida a Cloudinary
button.addEventListener("click", function () {

    const file = input.files[0];

    if (!file) {
        statusText.textContent = "Selecciona una imagen primero.";
        statusText.style.color = "red";
        return;
    }

    if (!file.type.startsWith("image/")) {
        statusText.textContent = "El archivo debe ser una imagen válida.";
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
            return response.json().then(function (err) {
                throw new Error(err.error.message);
            });
        }
        return response.json();
    })
    .then(function (data) {

        statusText.textContent = "Imagen subida correctamente.";
        statusText.style.color = "green";

        uploadedImageUrl = data.secure_url;
        preview.src = uploadedImageUrl;
        preview.style.display = "block";

        button.disabled = false;
    })
    .catch(function (error) {

        statusText.textContent = "Error: " + error.message;
        statusText.style.color = "red";

        button.disabled = false;
    });

});

// Reiniciar
newImageBtn.addEventListener("click", function () {
    input.value = "";
    preview.src = "";
    preview.style.display = "none";
    statusText.textContent = "";
    transformSelect.value = "original";
});

// Aplicar transformaciones dinámicas
transformSelect.addEventListener("change", function () {

    if (!uploadedImageUrl) return;

    let transformedUrl = uploadedImageUrl;

    switch (transformSelect.value) {

        case "grayscale":
            transformedUrl = uploadedImageUrl.replace(
                "/upload/",
                "/upload/e_grayscale/"
            );
            break;

        case "profile":
            transformedUrl = uploadedImageUrl.replace(
                "/upload/",
                "/upload/w_200,h_200,c_fill,g_face,r_max/"
            );
            break;

        case "rounded":
            transformedUrl = uploadedImageUrl.replace(
                "/upload/",
                "/upload/r_40/"
            );
            break;

        default:
            transformedUrl = uploadedImageUrl;
    }

    preview.src = transformedUrl;
});
