from django.urls import path
from . import views  # <-- ¡Esta es la línea clave que faltaba!

urlpatterns = [
    path('registro/', views.registrar_usuario, name='registrar_usuario'),
    path('perfil/', views.perfil_usuario, name='perfil_usuario'),
]