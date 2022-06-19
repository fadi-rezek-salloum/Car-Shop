import uuid

from django.db import models

class Car(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    brand = models.CharField(max_length=40)
    country = models.CharField(max_length=40)

    picture = models.ImageField(upload_to='cars/')

    plate_numbers = models.CharField(max_length=10, unique=True)
    status = models.TextField(null=True, blank=True)

    rental_price = models.DecimalField(max_digits=20, decimal_places=0)

    is_available = models.BooleanField(default=True)

    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Car: {self.brand} - {self.plate_numbers}"
    
