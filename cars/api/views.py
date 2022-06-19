import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from cars.models import Car
from rental.models import Rental
from .serializers import CarSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def carsList(request):
    rentals = Rental.objects.all()

    for rental in rentals:
        if rental.end_date < datetime.date.today():
            car = Car.objects.get(rental=rental)
            car.is_available = True
            car.save()

            rental.delete()

    cars = Car.objects.filter(is_available=True).order_by('-created')

    serializer = CarSerializer(cars, many=True)

    return Response(serializer.data)