from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from users.models import Customer
from cars.models import Car
from rental.models import Rental

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rentCar(request):
    data = request.data

    customer = Customer.objects.get(id=data['customer'])
    car = Car.objects.get(id=data['car'])

    car.is_available = False
    car.save()

    rental = Rental.objects.create(car=car, customer=customer, start_date=data['start_date'], end_date=data['end_date'], location=data['location'], tax=data['tax'])
    rental.save()

    return Response('ok')