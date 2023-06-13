from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from cars.models import SellCar

from .serializers import HistorySerializer
from .models import History


class HistoryList(ListAPIView):
    serializer_class = HistorySerializer
    permission_classes = [IsAuthenticated,]
    

    def get_queryset(self):
        return History.objects.filter(customer=self.request.user).order_by('-created')