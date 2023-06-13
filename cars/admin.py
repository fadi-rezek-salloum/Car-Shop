from django.contrib import admin

from .models import Car, RentalCar, SellCar

admin.site.register(Car)
admin.site.register(SellCar)
admin.site.register(RentalCar)