import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from app.models import Servicio

servicios_iniciales = [
    {"nombre": "Desarrollo Web", "desc": "Páginas modernas", "precio": 1500},
    {"nombre": "Mantenimiento PC", "desc": "Limpieza y optimización", "precio": 800},
    {"nombre": "Redes", "desc": "Instalación de redes", "precio": 2000},
    {"nombre": "Soporte Técnico", "desc": "Asistencia remota", "precio": 500},
    {"nombre": "Base de Datos", "desc": "Diseño y gestión", "precio": 1800},
    {"nombre": "Seguridad", "desc": "Protección de sistemas", "precio": 2500},
    {"nombre": "Apps Móviles", "desc": "Desarrollo Android", "precio": 3000},
    {"nombre": "Consultoría", "desc": "Asesoría IT", "precio": 1200},
    {"nombre": "Cloud", "desc": "Servicios en la nube", "precio": 2200},
    {"nombre": "Automatización", "desc": "Scripts y bots", "precio": 1700}
]

# Solo insertamos si la base de datos está vacía para no duplicar
if Servicio.objects.count() == 0:
    for s in servicios_iniciales:
        Servicio.objects.create(**s)
    print("Servicios iniciales cargados con éxito en la base de datos.")
else:
    print("La base de datos ya contiene servicios. No se insertaron duplicados.")
