import uuid

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from users.models import Customer

class Car(models.Model):

    class TransmissionChoices(models.Choices):
        AUTOMATIC = ('A', 'Automatic')
        MANUAL = ('M', 'Manual')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=40)
    year = models.IntegerField(validators=[MinValueValidator(1000), MaxValueValidator(9999)])
    country = models.CharField(max_length=40)
    picture = models.ImageField(upload_to='cars/')
    fuel_type = models.CharField(max_length=40)
    transmission = models.CharField(max_length=15, choices=TransmissionChoices.choices)
    seats = models.IntegerField(default=5)
    engine_capacity = models.CharField(max_length=25)
    max_power = models.CharField(max_length=25)
    kms_driven = models.IntegerField(default=0)

    price = models.DecimalField(max_digits=20, decimal_places=0)
    location = models.CharField(max_length=255, null=True, blank=True)

    for_sale = models.BooleanField(default=False)   

    created = models.DateField(auto_now_add=True)

    def get_location_cords(self):
        return self.location.split(',')

    class Meta:
        abstract = True

    
class RentalCar(Car):
    customer = models.ForeignKey(Customer , verbose_name='rental_customer' , on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()
    
    tax = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    plate_numbers = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"{self.customer.email} - {self.car.name}"
    
class SellCar(Car):
    customer = models.ForeignKey(Customer , verbose_name='sell_customer' , on_delete=models.CASCADE)

    tax = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.customer.email} - {self.car.name}"

