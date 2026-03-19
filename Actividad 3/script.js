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

    if (pagina.includes("index")) {
        Vue.createApp({
            data() {
                return {
                    integrantes: integrantesBase
                }
            }
        }).mount("#app");
    }

    if (pagina.includes("catalogo")) {
        Vue.createApp({
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
        }).mount("#app");
    }

    if (pagina.includes("alta")) {
        Vue.createApp({
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
        }).mount("#app");
    }

});