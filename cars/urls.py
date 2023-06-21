from django.urls import path

from . import views

urlpatterns = [
    path('rental-cars-list/', views.RentalCarsList.as_view()),
    path('sell-cars-list/', views.SellCarsList.as_view()),

    path('rent-car/', views.RentCar.as_view()),
    path('sell-car/', views.SellCar.as_view()),

    path('colors-list/', views.get_all_colors),
    path('names-list/', views.get_all_names),
    path('max-price/', views.get_max_price),
    path('min-price/', views.get_min_price),

    path('predict-selling-price/<str:name>/', views.predict_selling_price),
]