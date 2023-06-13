from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/accounts/', include('users.urls')),

    path('api/cars/', include('cars.urls')),
    path('api/parts/', include('parts.urls')),
    path('api/bill/', include('bill.urls')),

    path('api/history/', include('history.urls')),

    path('api/help/', include('helps.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

