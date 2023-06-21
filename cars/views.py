import os
import pandas as pd

from django.db.models import Max, Min
from django.conf import settings
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from cars.models import Car
from history.models import History
from users.models import Customer
from .serializers import CarSerializer, RentalCarSerializer, SellCarSerializer
from .utils import read_dataset, clean_dataset, gradient_boosting_regressor


def get_all_colors(request):
    values = Car.objects.values_list('color', flat=True).distinct()
    values_ar = Car.objects.values_list('color_ar', flat=True).distinct()
    return JsonResponse({'colors': list(values), 'colors_ar': list(values_ar)})


def get_all_names(request):
    values = Car.objects.values_list('name', flat=True).distinct()
    values_ar = Car.objects.values_list('name_ar', flat=True).distinct()
    return JsonResponse({'names': list(values), 'names_ar': list(values_ar)})


def get_max_price(request):
    max_price = Car.objects.aggregate(max_price=Max('selling_price'))['max_price']
    return JsonResponse({'max_price': max_price})


def get_min_price(request):
    min_price = Car.objects.aggregate(min_price=Min('selling_price'))['min_price']
    return JsonResponse({'min_price': min_price})


def predict_selling_price(request, name):
    car = Car.objects.filter(name__icontains=name, for_sale=True)

    car_dict = car.values('name', 'year', 'selling_price', 'km_driven', 'fuel', 'seller_type', 'transmission', 'owner', 'mileage', 'engine', 'max_power', 'seats')[0]
    car_dict['selling_price'] = int(car_dict['selling_price'])
    if car_dict['transmission'] == 'M':
        car_dict['transmission'] = 'Manual'
    else:
        car_dict['transmission'] = 'Automatic'

    new_dict = {}
    for key, value in car_dict.items():
        new_dict[key] = [value]

    new_dict['torque'] = ['']

    new = pd.DataFrame.from_dict(new_dict)

    df = pd.read_csv(os.path.join(settings.STATIC_ROOT, 'datasets', 'cars.csv'))

    df = pd.concat([df, new], ignore_index=True)

    df = clean_dataset(df)

    result = gradient_boosting_regressor(df)

    return JsonResponse({'result': int(result)})


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
            if self.request.GET['color'] or self.request.GET['max_price'] or self.request.GET['name'] or self.request.GET['transmission']:
                cars = Car.objects.filter(for_sale=True, color__icontains=self.request.GET['color'], name__icontains=self.request.GET['name'], transmission__icontains=self.request.GET['transmission'], selling_price__gte=int(self.request.GET['max_price'])).order_by('-created')
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