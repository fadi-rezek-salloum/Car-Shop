from rest_framework.serializers import ModelSerializer

from cars.models import Car, RentalCar, SellCar

class CarSerializer(ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class RentalCarSerializer(ModelSerializer):
    class Meta:
        model = RentalCar
        fields = '__all__'

class SellCarSerializer(ModelSerializer):
    class Meta:
        model = SellCar
        fields = '__all__'
