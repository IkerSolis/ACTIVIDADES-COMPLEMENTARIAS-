from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio),              
    path('catalogo/', views.catalogo),  
    path('alta/', views.alta),          
]