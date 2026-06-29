from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes # <-- Añadimos permission_classes
from rest_framework.permissions import IsAuthenticated # <-- Añadimos esta herramienta de seguridad
from .serializers import RegistroSerializer
from .models import PerfilAgricola # <-- Importamos tu modelo para poder leer la base de datos

@api_view(['POST'])
def registrar_usuario(request):
    # Pasamos los datos recibidos del formulario al serializer
    serializer = RegistroSerializer(data=request.data)
    
    # Si los datos son válidos (ej. el correo no está repetido, etc.) los guardamos
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "¡Cuenta creada con éxito!"}, status=status.HTTP_201_CREATED)
    
    # Si hay algún error (como un RIF ya registrado), se lo devolvemos al frontend
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- NUEVA FUNCIÓN PARA EL DASHBOARD ---
@api_view(['GET'])
@permission_classes([IsAuthenticated]) # Exige que React envíe un Token válido
def perfil_usuario(request):
    try:
        # Buscamos el perfil agrícola amarrado al usuario que hace la petición
        perfil = PerfilAgricola.objects.get(usuario=request.user)
        
        # Devolvemos la información clave para que React sepa a dónde redirigir
        return Response({
            "nombre": perfil.nombre_completo,
            "tipo_cuenta": perfil.tipo_cuenta
        })
    except PerfilAgricola.DoesNotExist:
        # Por seguridad, si hay un error y no se encuentra el perfil
        return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)