from django.urls import path

from . import views

urlpatterns = [
    path('', views.HistoryList.as_view()),
]
