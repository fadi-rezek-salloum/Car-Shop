import uuid

from django.db import models

from users.models import Customer
from cars.models import Car
from parts.models import Part

class History(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    
    car = models.ForeignKey(Car, on_delete=models.SET_NULL, null=True, blank=True)
    part = models.ForeignKey(Part, on_delete=models.SET_NULL, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer.first_name + ' ' + self.customer.last_name