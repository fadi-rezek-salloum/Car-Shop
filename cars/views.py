from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from cars.models import Car, RentalCar, SellCar
from .serializers import CarSerializer, RentalCarSerializer, SellCarSerializer


class RentalCarsList(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        return Car.objects.filter(for_sale=False).order_by('-created')
    
    
class SellCarsList(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        return Car.objects.filter(for_sale=True).order_by('-created')
    

class RentCar(generics.CreateAPIView):
    serializer_class = RentalCarSerializer
    permission_classes = [IsAuthenticated,]


class SellCar(generics.CreateAPIView):
    serializer_class = SellCarSerializer
    permission_classes = [IsAuthenticated,]