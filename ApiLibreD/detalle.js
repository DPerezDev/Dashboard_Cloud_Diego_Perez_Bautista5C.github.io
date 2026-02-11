const animeDetail = document.getElementById("animeDetail");

// Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function cargarDetalle() {
    const respuesta = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await respuesta.json();

    const anime = data.data;

    animeDetail.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images.jpg.image_url}">
        <p>${anime.synopsis}</p>
        <p>⭐ Score: ${anime.score}</p>
        <p>🎬 Episodios: ${anime.episodes}</p>
        <button onclick="window.history.back()">Volver</button>
    `;
}

cargarDetalle();
