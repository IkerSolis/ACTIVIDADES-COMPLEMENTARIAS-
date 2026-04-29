from django.db import models

class User(models.Model):
    img = models.TextField(blank=True, null=True)
    nombre = models.CharField(max_length=150)
    rol = models.CharField(max_length=100, blank=True, null=True)
    experiencia = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

    def __str__(self):
        return self.nombre

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'servicios'

    def __str__(self):
        return self.nombre
