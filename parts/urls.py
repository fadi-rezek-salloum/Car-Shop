from django.urls import path

from . import views

urlpatterns = [
    path('parts-list/', views.partsList),

    path('countries-list/', views.get_all_countries),
    path('brands-list/', views.get_all_brands),


    path('part-to-cart/<id>/', views.partToCart),
    path('part-out-cart/<id>/', views.partOutCart),
]