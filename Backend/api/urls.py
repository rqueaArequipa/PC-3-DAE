from rest_framework.routers import DefaultRouter
from .views import EmpleadoHonorarioViewSet, TblEmpleadoViewSet, TblCargoViewSet, TblVehiculoViewSet
from django.urls import path, include

router = DefaultRouter()

router.register('honorario', EmpleadoHonorarioViewSet, 'honorario')
router.register('empleado', TblEmpleadoViewSet, 'empleado')
router.register('cargo', TblCargoViewSet, 'cargo')
router.register('vehiculo', TblVehiculoViewSet, 'vehiculo')
urlpatterns = [
    path('api/',include(router.urls))
]