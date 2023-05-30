from django.urls import path

from .api. import views

urlpatterns = [
    path('parts-list/', views.partsList),  

    path('part-to-cart/<id>/', views.partToCart),
    path('part-out-cart/<id>/', views.partOutCart),
]