from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/accounts/', include('users.api.urls')),

    path('api/cars/', include('cars.api.urls')),
    path('api/rent/', include('rental.api.urls')),
    path('api/parts/', include('parts.api.urls')),
    path('api/bill/', include('bill.api.urls')),

    path('api/help/', include('helps.api.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

