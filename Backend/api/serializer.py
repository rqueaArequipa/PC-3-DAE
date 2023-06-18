from rest_framework import serializers
from .models import EmpleadoHonorario, TblEmpleado, TblCargo,TblVehiculo

class EmpleadoHonorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpleadoHonorario
        fields = '__all__'
        
class TblEmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblEmpleado
        fields = '__all__'

class TblCargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblCargo
        fields = '__all__'
        
class TblVehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblVehiculo
        fields = '__all__'        