document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("layout-body");

    const header = `
    <header class="layout-header">
        <div class="layout-header-inner">
            <h1>Prácticas en clase</h1>
            <nav>
                <a href="../index.html">Inicio</a>
                <a href="../about.html">Acerca de</a>
                <a href="../contact.html">Contacto</a>
            </nav>
        </div>
    </header>
    `;

    const footer = `
    <footer class="layout-footer">
        <div class="layout-footer-inner">
            <p>&copy; 2026 Prácticas en clase - Diego Pérez Bta</p>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);

});
