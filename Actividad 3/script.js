document.addEventListener("DOMContentLoaded", () => { 

    const pagina = window.location.pathname;

    const serviciosBase = [
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

    const integrantesBase = [
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

    // FUNCIÓN PARA LOS COMPONENTES (header, footer, lista de integrantes, servicios y agregar servicio)
    function registrarComponentes(app) {
        app.component('app-header', {
            template: `
                <header>
                    <h1>Servicios de Ingeniería en Sistemas</h1>
                    <nav>
                        <a href="index.html">Inicio</a>
                        <a href="catalogo.html">Catálogo</a>
                        <a href="alta.html">Agregar Servicio</a>
                    </nav>
                </header>
            `
        });

        app.component('app-footer', {
            template: `
                <footer>
                    © 2026 - Stardust Crusaders
                </footer>
            `
        });

        app.component('equipo-lista', {
            props: ['integrantes'],
            template: `
                <div class="container">
                    <p>Somos un equipo de ingenieros en sistemas especializados en desarrollo de soluciones tecnológicas.</p>
                    <h2>Nuestro Equipo</h2>
                    <div class="card" v-for="persona in integrantes" :key="persona.nombre">
                        <img :src="persona.img">
                        <div>
                            <h3>{{ persona.nombre }}</h3>
                            <p>Rol: {{ persona.rol }}</p>
                            <p>Experiencia: {{ persona.experiencia }}</p>
                        </div>
                    </div>
                </div>
            `
        });

        app.component('servicios-lista', {
            props: ['servicios'],
            template: `
                <div class="container">
                    <h2>Catálogo de Servicios</h2>
                    <div class="card"
                        v-for="servicio in servicios"
                        :key="servicio.nombre"
                        :class="{ caro: servicio.precio > 1000 }">
                        <div>
                            <h3>{{ servicio.nombre }}</h3>
                            <p>{{ servicio.desc }}</p>
                            <p>$ {{ servicio.precio }}</p>
                        </div>
                    </div>
                </div>
            `
        });

        app.component('agregar-servicio', {
            data() {
                return {
                    nombre: "",
                    desc: "",
                    precio: null,
                    error: ""
                }
            },
            methods: {
                guardar() {

                    if (!this.nombre || !this.desc || !this.precio) {
                        this.error = "Por favor, completa todos los campos";
                        return;
                    }

                    if (this.precio <= 0) {
                        this.error = "El precio debe ser mayor a 0";
                        return;
                    }

                    const nuevoServicio = {
                        nombre: this.nombre,
                        desc: this.desc,
                        precio: this.precio
                    };
                    let lista = JSON.parse(localStorage.getItem("servicios")) || [];
                    lista.push(nuevoServicio);
                    localStorage.setItem("servicios", JSON.stringify(lista));
                    this.error = "Servicio guardado correctamente";
                    setTimeout(() => {
                        window.location.href = "catalogo.html";
                    }, 1000);
                }
            },
            template: `
                <div class="container">
                    <h2>Agregar Servicio</h2>
                    <form @submit.prevent="guardar">
                        <input v-model="nombre" placeholder="Nombre del servicio">
                        <input v-model="desc" placeholder="Descripción">
                        <input v-model.number="precio" type="number" placeholder="Precio">
                        <button type="submit">Guardar</button>
                        <p style="color:red">{{ error }}</p>
                    </form>
                </div>
            `
        });
    }
    // INDEX 
    if (pagina.includes("index")) {
        const app = Vue.createApp({
            data() {
                return {
                    integrantes: integrantesBase
                }
            }
        });

        registrarComponentes(app);
        app.mount("#app");
    }
    //  CATALOGO 
    if (pagina.includes("catalogo")) {
        const app = Vue.createApp({
            data() {
                return {
                    servicios: []
                }
            },
            methods: {
                obtenerServicios() {
                    let extra = JSON.parse(localStorage.getItem("servicios")) || [];
                    return serviciosBase.concat(extra);
                }
            },
            mounted() {
                this.servicios = this.obtenerServicios();
            }
        });

        registrarComponentes(app);
        app.mount("#app");
    }
    //  ALTA 
    if (pagina.includes("alta")) {
        const app = Vue.createApp({
            data() {
                return {
                    nombre: "",
                    desc: "",
                    precio: null,
                    error: ""
                }
            },
            methods: {
                guardar() {
                    if (!this.nombre || !this.desc || !this.precio) {
                        this.error = "Por favor, completa todos los campos";
                        return;
                    }
                    if (this.precio <= 0) {
                        this.error = "El precio debe ser mayor a 0";
                        return;
                    }
                    const nuevoServicio = {
                        nombre: this.nombre,
                        desc: this.desc,
                        precio: this.precio
                    };
                    let lista = JSON.parse(localStorage.getItem("servicios")) || [];
                    lista.push(nuevoServicio);
                    localStorage.setItem("servicios", JSON.stringify(lista));
                    this.error = "Servicio guardado correctamente";
                    setTimeout(() => {
                        window.location.href = "catalogo.html";
                    }, 1000);
                }
            }
        });
        registrarComponentes(app);
        app.mount("#app");
    }
});