import uuid

from django.db import models

from users.models import Customer
from cars.models import Car

class Rental(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    car = models.OneToOneField(Car, verbose_name='rental_car' , on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer , verbose_name='rental_customer' , on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()

    location = models.CharField(max_length=255)
    tax = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.customer.email} - {self.car.brand}"
    
