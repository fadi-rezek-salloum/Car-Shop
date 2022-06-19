import uuid

from django.db import models

class Part(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=200)

    picture = models.ImageField(upload_to='parts/')
    
    brand = models.CharField(max_length=100)  
    country = models.CharField(max_length=60)
    
    in_stock = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"Car Part: {self.name}"
    