// Arreglo con todos los integrantes (Removido, ahora se obtiene desde BD)

// Header y navegación (RUTAS CORREGIDAS)
function crearHeader() {
    const header = document.createElement("header");

    const titulo = document.createElement("h1");
    titulo.textContent = "Servicios de Ingeniería en Sistemas";

    const nav = document.createElement("nav");

    const link1 = document.createElement("a");
    link1.href = "/"; // ← antes: index.html
    link1.textContent = "Inicio";

    const link2 = document.createElement("a");
    link2.href = "/catalogo/"; // ← antes: catalogo.html
    link2.textContent = "Catálogo";

    const link3 = document.createElement("a");
    link3.href = "/alta/"; // ← antes: alta.html
    link3.textContent = "Agregar Servicio";

    nav.appendChild(link1);
    nav.appendChild(link2);
    nav.appendChild(link3);

    header.appendChild(titulo);
    header.appendChild(nav);

    return header;
}

// Footer
function crearFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "© 2026 - Stardust Crusaders";
    return footer;
}

// INDEX
function cargarIndex(listaIntegrantes) {
    const app = document.getElementById("app");

    app.appendChild(crearHeader());

    const container = document.createElement("div");
    container.className = "container";

    const info = document.createElement("p");
    info.textContent = "Somos un equipo de ingenieros en sistemas especializados en desarrollo de soluciones tecnológicas.";

    container.appendChild(info);

    const titulo = document.createElement("h2");
    titulo.textContent = "Nuestro Equipo";
    container.appendChild(titulo);

    listaIntegrantes.forEach(persona => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = persona.img;

        const info = document.createElement("div");

        const nombre = document.createElement("h3");
        nombre.textContent = persona.nombre;

        const rol = document.createElement("p");
        rol.textContent = "Rol: " + persona.rol;

        const exp = document.createElement("p");
        exp.textContent = "Experiencia: " + persona.experiencia;

        info.appendChild(nombre);
        info.appendChild(rol);
        info.appendChild(exp);

        card.appendChild(img);
        card.appendChild(info);

        container.appendChild(card);
    });

    app.appendChild(container);
    app.appendChild(crearFooter());
}

// CATÁLOGO
function cargarCatalogo(listaServicios) {
    const app = document.getElementById("app");

    app.appendChild(crearHeader());

    const container = document.createElement("div");
    container.className = "container";

        listaServicios.forEach(servicio => {
        const card = document.createElement("div");
        card.className = "cardServicio";

        if (servicio.precio > 1000) {
            card.classList.add("caro");
        }

        const nombre = document.createElement("h3");
        nombre.textContent = servicio.nombre;

        const desc = document.createElement("p");
        desc.textContent = servicio.descripcion;

        const precio = document.createElement("p");
        precio.textContent = "$" + servicio.precio;

        card.appendChild(nombre);
        card.appendChild(desc);
        card.appendChild(precio);

        container.appendChild(card);
    });

    app.appendChild(container);
    app.appendChild(crearFooter());
}

