from django.urls import path

from . import views

urlpatterns = [
    path('parts-list/', views.partsList),

    path('associate-parts/<id>/', views.associate_parts),

    path('countries-list/', views.get_all_countries),
    path('brands-list/', views.get_all_brands),


    path('part-to-cart/<id>/', views.partToCart),
    path('part-out-cart/<id>/', views.partOutCart),
]