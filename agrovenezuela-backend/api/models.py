from django.db import models
from django.contrib.auth.models import User

class PerfilAgricola(models.Model):
    # Opciones para el tipo de cuenta (Radio buttons)
    TIPOS_CUENTA = [
        ('comprador', 'Soy Comprador'),
        ('distribuidor', 'Soy Distribuidor'),
    ]
    
    # Vinculamos este perfil al usuario de Django (que maneja el email y encripta la contraseña)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # Datos personales / empresa
    tipo_cuenta = models.CharField(max_length=20, choices=TIPOS_CUENTA)
    nombre_completo = models.CharField(max_length=200, verbose_name="Nombre Completo o Empresa")
    rif_cedula = models.CharField(max_length=50, unique=True, verbose_name="RIF / Cédula")
    telefono = models.CharField(max_length=20)
    
    # Ubicación
    estado = models.CharField(max_length=100)
    municipio = models.CharField(max_length=100)
    sector = models.CharField(max_length=200)

    # Fecha en la que se creó el registro
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre_completo} - {self.get_tipo_cuenta_display()}"