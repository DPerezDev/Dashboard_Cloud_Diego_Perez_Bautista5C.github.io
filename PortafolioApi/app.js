const usuario = "DPerezDev"; 

const perfilContainer = document.getElementById("perfil");
const reposContainer = document.getElementById("repos");
const followersContainer = document.getElementById("followers");


async function obtenerPerfil() {
    const respuesta = await fetch(`https://api.github.com/users/${usuario}`);
    const data = await respuesta.json();

    perfilContainer.innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar">
        <h1>${data.name || data.login}</h1>
        <p>${data.bio || "Desarrollador de Software"}</p>
        <p> Ubicación: ${data.location || "Ubicación no especificada"}</p>
    `;
}

async function obtenerRepos() {
    const url = `https://api.github.com/users/${usuario}/repos?sort=updated&direction=desc&per_page=6&type=owner`;

    const respuesta = await fetch(url);
    const repos = await respuesta.json();

    repos.forEach(repo => {
        reposContainer.innerHTML += `
            <div class="repo-card">
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sin descripción"}</p>
                <p>⭐ ${repo.stargazers_count} |${repo.forks_count}</p>
                <a href="${repo.html_url}" target="_blank">Ver Proyecto</a>
            </div>
        `;
    });
}

async function obtenerFollowers() {
    const respuesta = await fetch(`https://api.github.com/users/${usuario}/followers?per_page=5`);
    const followers = await respuesta.json();

    followers.forEach(follower => {
        followersContainer.innerHTML += `
            <a href="${follower.html_url}" target="_blank">
                <img src="${follower.avatar_url}" title="${follower.login}">
            </a>
        `;
    });
}

obtenerPerfil();
obtenerRepos();
obtenerFollowers();
