from django.db.models import Count, Max
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from cars.models import Car
from history.models import History
from users.models import Customer
from .serializers import CarSerializer, RentalCarSerializer, SellCarSerializer


def get_all_colors(request):
    values = Car.objects.values_list('color', flat=True).distinct()
    return JsonResponse({'colors': list(values)})

def get_max_price(request):
    max_price = Car.objects.aggregate(max_price=Max('selling_price'))['max_price']
    return JsonResponse({'max_price': max_price})


class RentalCarsList(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        return Car.objects.filter(for_sale=False).order_by('-created')
    
    
class SellCarsList(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        try:
            if self.request.GET['color'] or self.request.GET['max_price']:
                cars = Car.objects.filter(for_sale=True, color__icontains=self.request.GET['color'], selling_price__gte=self.request.GET['max_price']).order_by('-created')
        except:
            cars = Car.objects.filter(for_sale=True).order_by('-created')

        return cars
    

class RentCar(generics.CreateAPIView):
    serializer_class = RentalCarSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        car = Car.objects.get(id=request.data['car'])
        customer = Customer.objects.get(id=request.data['customer'])

        History.objects.create(customer=customer, car=car)

        return response


class SellCar(generics.CreateAPIView):
    serializer_class = SellCarSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        car = Car.objects.get(id=request.data['car'])
        customer = Customer.objects.get(id=request.data['customer'])

        History.objects.create(customer=customer, car=car)

        return response