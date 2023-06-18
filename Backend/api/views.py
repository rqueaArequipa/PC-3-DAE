#from django.shortcuts import render
from .models import EmpleadoHonorario, TblEmpleado, TblCargo, TblVehiculo
from rest_framework import viewsets, permissions, filters
from .serializer import EmpleadoHonorarioSerializer, TblEmpleadoSerializer, TblCargoSerializer, TblVehiculoSerializer
from django_filters.rest_framework import DjangoFilterBackend

class EmpleadoHonorarioViewSet(viewsets.ModelViewSet):
    queryset = EmpleadoHonorario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EmpleadoHonorarioSerializer
    filter_backends =[DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'
    
class TblEmpleadoViewSet(viewsets.ModelViewSet):
    queryset = TblEmpleado.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TblEmpleadoSerializer
    filter_backends =[DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'

class TblCargoViewSet(viewsets.ModelViewSet):
    queryset = TblCargo.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TblCargoSerializer
    filter_backends =[DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'
    
class TblVehiculoViewSet(viewsets.ModelViewSet):
    queryset = TblVehiculo.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TblVehiculoSerializer
    filter_backends =[DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = '__all__'
    search_fields = '__all__'