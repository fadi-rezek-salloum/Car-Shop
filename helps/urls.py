from django.urls import path

from . import views

urlpatterns = [
    path('', views.helpRequest),

    path('create-checkout-session/', views.StripeCheckoutSession.as_view())
]
