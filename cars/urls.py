from django.urls import path

from . import views

urlpatterns = [
    path('rental-cars-list/', views.RentalCarsList.as_view()),
    path('sell-cars-list/', views.SellCarsList.as_view()),

    path('rent-cars/', views.RentCar.as_view()),
    path('sell-car/', views.SellCar.as_view()),
]