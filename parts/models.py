import uuid

from django.db import models

class Part(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=200)
    name_ar = models.CharField(max_length=200, null=True, blank=True)

    picture = models.ImageField(upload_to='parts/')

    country = models.CharField(max_length=60)
    country_ar = models.CharField(max_length=60, null=True, blank=True)
    
    in_stock = models.IntegerField(default=1)

    price = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"Car Part: {self.name}"
    