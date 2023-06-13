from rest_framework.serializers import ModelSerializer, SerializerMethodField
from cars.models import Car, RentalCar, SellCar

class CarSerializer(ModelSerializer):
    is_sold = SerializerMethodField()
    rental_days = SerializerMethodField()
    class Meta:
        model = Car
        fields = '__all__'

    def get_is_sold(self, obj):
        return obj.is_sold()

    def get_rental_days(self, obj):
        return obj.rental_days()

class RentalCarSerializer(ModelSerializer):
    class Meta:
        model = RentalCar
        fields = '__all__'

class SellCarSerializer(ModelSerializer):
    class Meta:
        model = SellCar
        fields = '__all__'
