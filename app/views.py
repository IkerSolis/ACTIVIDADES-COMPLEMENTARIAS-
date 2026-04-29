from django.shortcuts import render, redirect
from django.contrib import messages

def inicio(request):
    return render(request, 'index.html')

def catalogo(request):
    # Servicios que guardamos en la sesión para enviarlos al HTML
    nuevos_servicios = request.session.get('nuevos_servicios', [])
    return render(request, 'catalogo.html', {'nuevos_servicios': nuevos_servicios})

def alta(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        desc = request.POST.get('desc')
        precio = request.POST.get('precio')

        # Validaciones muy simples como aprendimos en clase
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

        # Si todo está bien, lo guardo temporalmente en las sesiones (diccionario de Django)
        nuevo_servicio = {
            'nombre': nombre,
            'desc': desc,
            'precio': precio_num
        }

        # Saco la lista actual de la sesión, le agrego el nuevo, y la vuelvo a guardar
        servicios_sesion = request.session.get('nuevos_servicios', [])
        servicios_sesion.append(nuevo_servicio)
        request.session['nuevos_servicios'] = servicios_sesion

        # Redirigir al catálogo para ver el resultado
        return redirect('/catalogo/')

    # Si entra por GET, solo muestra la página
    return render(request, 'alta.html')