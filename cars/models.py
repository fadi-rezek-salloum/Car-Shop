import uuid

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from users.models import Customer


TransmissionChoices = (
    ('M', 'Manual'),
    ('A', 'Automatic'),
)


class Car(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=40)
    name_ar = models.CharField(max_length=40, null=True, blank=True)


    year = models.IntegerField(validators=[MinValueValidator(1000), MaxValueValidator(9999)])

    country = models.CharField(max_length=40)
    country_ar = models.CharField(max_length=40, null=True, blank=True)

    picture = models.ImageField(upload_to='cars/')

    fuel = models.CharField(max_length=40)
    fuel_ar = models.CharField(max_length=40, null=True, blank=True)

    seller_type = models.CharField(max_length=50, null=True, blank=True, default="Individual")
    seller_type_ar = models.CharField(max_length=50, null=True, blank=True, default="فردي")

    owner = models.CharField(max_length=50, null=True, blank=True, default="First Owner")
    owner_ar = models.CharField(max_length=50, null=True, blank=True, default="راكب أول")

    transmission = models.CharField(max_length=15, choices=TransmissionChoices)

    seats = models.IntegerField(default=5)

    engine = models.CharField(max_length=25)
    engine_ar = models.CharField(max_length=25, null=True, blank=True)

    mileage = models.CharField(max_length=25, null=True, blank=True)
    mileage_ar = models.CharField(max_length=25, null=True, blank=True)

    max_power = models.CharField(max_length=25)
    max_power_ar = models.CharField(max_length=25, null=True, blank=True)

    km_driven = models.IntegerField(default=0)

    color = models.CharField(max_length=25)
    color_ar = models.CharField(max_length=25, null=True, blank=True)

    location = models.CharField(max_length=255, null=True, blank=True)

    for_sale = models.BooleanField(default=False)

    rental_price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    selling_price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)

    created = models.DateField(auto_now_add=True)

    def get_location_cords(self):
        return self.location.split(',')
    
    def is_sold(self):
        try:
            return self.sellcar_set.get(car__id=self.id) is not None
        except:
            return False
        
    def rental_days(self):
        try:
            rental_car = self.rentalcar_set.filter(car__id=self.id).order_by('-start_date').first()
            return [rental_car.start_date, rental_car.end_date]
        except:
            return [False]

    
class RentalCar(models.Model):
    customer = models.ForeignKey(Customer , verbose_name='rental_customer' , on_delete=models.CASCADE)

    car = models.ForeignKey(Car , verbose_name='rental_car' , on_delete=models.CASCADE, null=True)

    start_date = models.DateField()
    end_date = models.DateField()
    
    tax = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.customer.email} - {self.car.name}"
    
class SellCar(models.Model):
    customer = models.ForeignKey(Customer , verbose_name='sell_customer' , on_delete=models.CASCADE)

    car = models.ForeignKey(Car , verbose_name='sell_car' , on_delete=models.CASCADE, null=True)

    tax = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.customer.email} - {self.car.name}"

