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
        
    def to_representation(self,instance):
        representation = super().to_representation(instance)
        representation['cargo'] = instance.cargo.cargo_nombre
        representation['tbl_vehiculo_vehiculo'] = instance.tbl_vehiculo_vehiculo.vehiculo_placa
        return representation

class TblCargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblCargo
        fields = '__all__'
        
class TblVehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblVehiculo
        fields = '__all__'        