from rest_framework import serializers

from rental.models import Rental

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = '__all__'