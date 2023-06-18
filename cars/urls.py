from django.urls import path

from . import views

urlpatterns = [
    path('rental-cars-list/', views.RentalCarsList.as_view()),
    path('sell-cars-list/', views.SellCarsList.as_view()),

    path('rent-car/', views.RentCar.as_view()),
    path('sell-car/', views.SellCar.as_view()),

    path('colors-list/', views.get_all_colors),
    path('max-price/', views.get_max_price),

    path('predict-selling-price/<id>/', views.predict_selling_price),
]