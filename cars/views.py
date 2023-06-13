from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from cars.models import Car, RentalCar, SellCar
from history.models import History
from users.models import Customer
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
        # if self.request.GET('')

        cars = Car.objects.filter(for_sale=True).order_by('-created')

        return cars
    

class RentCar(generics.CreateAPIView):
    serializer_class = RentalCarSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        car = Car.objects.get(id=request.data['car'])
        customer = Customer.objects.get(id=request.data['customer'])

        History.objects.create(customer=customer, item=car)

        return response


class SellCar(generics.CreateAPIView):
    serializer_class = SellCarSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        car = Car.objects.get(id=request.data['car'])
        customer = Customer.objects.get(id=request.data['customer'])

        History.objects.create(customer=customer, item=car)

        return response