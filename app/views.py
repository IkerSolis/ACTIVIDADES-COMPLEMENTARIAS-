from django.shortcuts import render

def inicio(request):
    return render(request, 'index.html')

def catalogo(request):
    return render(request, 'catalogo.html')

def alta(request):
    return render(request, 'alta.html')