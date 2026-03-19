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

// Header y redireccionamiento
function crearHeader() {
    const header = document.createElement("header");

    const titulo = document.createElement("h1");
    titulo.textContent = "Servicios de Ingeniería en Sistemas";

    const nav = document.createElement("nav");

    const link1 = document.createElement("a");
    link1.href = "index.html";
    link1.textContent = "Inicio";

    const link2 = document.createElement("a");
    link2.href = "catalogo.html";
    link2.textContent = "Catálogo";

    const link3 = document.createElement("a");
    link3.href = "alta.html";
    link3.textContent = "Agregar Servicio";


    nav.appendChild(link1);
    nav.appendChild(link2);
    nav.appendChild(link3);

    header.appendChild(titulo);
    header.appendChild(nav);

    return header;
}

//footer
function crearFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "© 2026 - Stardust Crusaders";
    return footer;
}

//funcion principal para el index
function cargarIndex() {
    const app = document.getElementById("app");

    app.appendChild(crearHeader());

    const container = document.createElement("div");
    container.className = "container";

    const info = document.createElement("p");
    info.textContent = "Somos un equipo de ingenieros en sistemas especializados en desarrollo de soluciones tecnológicas.";

    container.appendChild(info);
    app.appendChild(container);

    const titulo = document.createElement("h2");
    titulo.textContent = "Nuestro Equipo";

    container.appendChild(titulo);

    //bucle para iterar arreglo de los integrantes
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
    app.appendChild(crearFooter());
}

//funcion principal para el catalogo
function cargarCatalogo() {
    const app = document.getElementById("app");

    app.appendChild(crearHeader());

    const container = document.createElement("div");
    container.className = "container";

    obtenerServicios().forEach(servicio => {
        const card = document.createElement("div");
        card.className = "card";

        // Para el precio > 1000
        if (servicio.precio > 1000) {
            card.classList.add("caro");
        }

        const nombre = document.createElement("h3");
        nombre.textContent = servicio.nombre;

        const desc = document.createElement("p");
        desc.textContent = servicio.desc;

        const precio = document.createElement("p");
        precio.textContent = "$" + servicio.precio;

        const img = document.createElement("img");

        card.appendChild(nombre);
        card.appendChild(desc);
        card.appendChild(precio);
        card.appendChild(img);

        container.appendChild(card);
    });

    app.appendChild(container);
    app.appendChild(crearFooter());
}

//funcion para unir los servicios que se agreguen
function obtenerServicios() {
    let base = [...servicios]; 

    let extra = JSON.parse(localStorage.getItem("servicios")) || [];

    return base.concat(extra);
}

//funcion principal para el alta
function cargarAlta() {
    const app = document.getElementById("app");

    app.appendChild(crearHeader());

    const container = document.createElement("div");
    container.className = "container";

    const form = document.createElement("form");

    const inputNombre = document.createElement("input");
    inputNombre.placeholder = "Nombre del servicio";

    const inputDesc = document.createElement("input");
    inputDesc.placeholder = "Descripción";

    const inputPrecio = document.createElement("input");
    inputPrecio.type = "number";
    inputPrecio.placeholder = "Precio";

    const error = document.createElement("p");
    error.style.color = "red";

    const btn = document.createElement("button");
    btn.textContent = "Guardar";

    form.appendChild(inputNombre);
    form.appendChild(inputDesc);
    form.appendChild(inputPrecio);
    form.appendChild(btn);
    form.appendChild(error);

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        //validaciones
        if (inputNombre.value === "" || inputDesc.value === "" || inputPrecio.value === "") {
            error.textContent = "Por favor, completa todos los campos";
            return;
        }

        if (inputPrecio.value <= 0) {
            error.textContent = "El precio debe ser mayor a 0";
            return;
        }

        const nuevoServicio = {
            nombre: inputNombre.value,
            desc: inputDesc.value,
            precio: parseFloat(inputPrecio.value),
        };

        let lista = JSON.parse(localStorage.getItem("servicios")) || [];
        lista.push(nuevoServicio);

        localStorage.setItem("servicios", JSON.stringify(lista));

        form.reset();
        error.textContent = "Servicio guardado exitosamente.";

        setTimeout(() => {
            window.location.href = "catalogo.html";
        }, 1000);
    });

    container.appendChild(form);
    app.appendChild(container);

    app.appendChild(crearFooter());
}