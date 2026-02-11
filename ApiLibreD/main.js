const animeList = document.getElementById("animeList");
const animeDetail = document.getElementById("animeDetail");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

let currentPage = 1;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

async function obtenerTopAnime() {
    const respuesta = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await respuesta.json();

    animeList.innerHTML = "";

    data.data.slice(0, 10).forEach(anime => {
        animeList.innerHTML += `
            <div class="card" onclick="irADetalle(${anime.mal_id})">
                <img src="${anime.images.jpg.image_url}" width="100">
                <h3>${anime.title}</h3>
            </div>
        `;
    });
}

function irADetalle(id) {
    window.location.href = `detalle.html?id=${id}`;
}

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query === "") {
        obtenerTopAnime();
        return;
    }
    const respuesta = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await respuesta.json();

    animeList.innerHTML = "";
    data.data.slice(0, 10).forEach(anime => {
        animeList.innerHTML += `
            <div class="card" onclick="irADetalle(${anime.mal_id})">
                <img src="${anime.images.jpg.image_url}">
                <h3>${anime.title}</h3>
            </div>
        `;
    });
});

async function obtenerTopAnime(page = 1) {

    const respuesta = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const data = await respuesta.json();

    animeList.innerHTML = "";

    data.data.forEach(anime => {
        animeList.innerHTML += `
            <div class="card" onclick="irADetalle(${anime.mal_id})">
                <img src="${anime.images.jpg.image_url}">
                <h3>${anime.title}</h3>
            </div>
        `;
    });

    pageNumber.textContent = page;
}

nextBtn.addEventListener("click", () => {
    currentPage++;
    obtenerTopAnime(currentPage);
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        obtenerTopAnime(currentPage);
    }
});



obtenerTopAnime();
obtenerTopAnime(currentPage);
