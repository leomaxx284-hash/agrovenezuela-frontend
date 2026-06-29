from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PerfilAgricola

class RegistroSerializer(serializers.ModelSerializer):
    # Definimos los campos que vienen del formulario del front
    tipo_cuenta = serializers.CharField(write_only=True)
    nombre_completo = serializers.CharField(write_only=True)
    rif_cedula = serializers.CharField(write_only=True)
    telefono = serializers.CharField(write_only=True)
    estado = serializers.CharField(write_only=True)
    municipio = serializers.CharField(write_only=True)
    sector = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'password', 'tipo_cuenta', 'nombre_completo', 'rif_cedula', 'telefono', 'estado', 'municipio', 'sector']

    def create(self, validated_data):
        # 1. Separamos los datos del perfil agrícola
        perfil_data = {
            'tipo_cuenta': validated_data.pop('tipo_cuenta'),
            'nombre_completo': validated_data.pop('nombre_completo'),
            'rif_cedula': validated_data.pop('rif_cedula'),
            'telefono': validated_data.pop('telefono'),
            'estado': validated_data.pop('estado'),
            'municipio': validated_data.pop('municipio'),
            'sector': validated_data.pop('sector'),
        }
        
        # 2. Usamos el email también como nombre de usuario (username) en Django
        email = validated_data['email']
        
        # 3. Creamos el usuario base (Django encripta la contraseña automáticamente)
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data['password']
        )
        
        # 4. Creamos el perfil agrícola amarrado a ese usuario
        PerfilAgricola.objects.create(usuario=user, **perfil_data)
        
        return user