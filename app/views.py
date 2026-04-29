from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Servicio, User

def inicio(request):
    # Traemos los usuarios de la base de datos (manual SQL)
    integrantes_qs = User.objects.all()
    integrantes = list(integrantes_qs.values('img', 'nombre', 'rol', 'experiencia'))
    return render(request, 'index.html', {'integrantes': integrantes})

def catalogo(request):
    # Obtenemos los servicios desde la base de datos
    servicios_qs = Servicio.objects.all().order_by('-id')
    # Convertimos a lista de diccionarios para poder usar json_script sin errores
    nuevos_servicios = list(servicios_qs.values('nombre', 'descripcion', 'precio'))
    
    # Decimal no es serializable en JSON directamente, así que lo pasamos a float
    for s in nuevos_servicios:
        if s['precio'] is not None:
            s['precio'] = float(s['precio'])
            
    return render(request, 'catalogo.html', {'nuevos_servicios': nuevos_servicios})

def alta(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        desc = request.POST.get('desc')
        precio = request.POST.get('precio')

        # Validaciones
        if not nombre or not desc or not precio:
            messages.error(request, 'Todos los campos son obligatorios.')
            return redirect('/alta/')

        try:
            precio_num = float(precio)
            if precio_num <= 0:
                messages.error(request, 'El precio debe ser mayor a 0.')
                return redirect('/alta/')
        except ValueError:
            messages.error(request, 'El precio debe ser un número válido.')
            return redirect('/alta/')

        # Guardar en la base de datos usando la columna descripcion
        Servicio.objects.create(
            nombre=nombre,
            descripcion=desc,
            precio=precio_num
        )

        # Redirigir al catálogo para ver el resultado
        return redirect('/catalogo/')

    # Si entra por GET, solo muestra la página
    return render(request, 'alta.html')