// Arreglo con todos los servicios
const servicios = [
    {nombre: "Desarrollo Web", desc: "Páginas modernas", precio: 1500},
    {nombre: "Mantenimiento PC", desc: "Limpieza y optimización", precio: 800},
    {nombre: "Redes", desc: "Instalación de redes", precio: 2000},
    {nombre: "Soporte Técnico", desc: "Asistencia remota", precio: 500},
    {nombre: "Base de Datos", desc: "Diseño y gestión", precio: 1800},
    {nombre: "Seguridad", desc: "Protección de sistemas", precio: 2500},
    {nombre: "Apps Móviles", desc: "Desarrollo Android", precio: 3000},
    {nombre: "Consultoría", desc: "Asesoría IT", precio: 1200},
    {nombre: "Cloud", desc: "Servicios en la nube", precio: 2200},
    {nombre: "Automatización", desc: "Scripts y bots", precio: 1700}
];

// Arreglo con todos los integrantes
const integrantes = [
    {
        img: "https://i.pinimg.com/736x/7c/6b/81/7c6b817390660204ea133247223c08f4.jpg",
        nombre: "Oscar Alejandro Arias Corona",
        rol: "Frontend Developer",
        experiencia: "Experiencia con HTML, CSS y JavaScript"
    },
    {
        img: "https://i.pinimg.com/736x/3b/5e/10/3b5e10a1a4cfd2640f738329c9a62407.jpg",
        nombre: "Iker Solís Ramírez",
        rol: "Backend Developer",
        experiencia: "Experiencia con PHP y bases de datos MySQL"
    }
];

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
function cargarIndex() {
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

    integrantes.forEach(persona => {
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
function cargarCatalogo() {
    const app = document.getElementById("app");

    app.appendChild(crearHeader());

    const container = document.createElement("div");
    container.className = "container";

        servicios.forEach(servicio => {
        const card = document.createElement("div");
        card.className = "cardServicio";

        if (servicio.precio > 1000) {
            card.classList.add("caro");
        }

        const nombre = document.createElement("h3");
        nombre.textContent = servicio.nombre;

        const desc = document.createElement("p");
        desc.textContent = servicio.desc;

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

