from rest_framework import serializers

from users.models import Customer

class CustomerSerialier(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'middle_name', 'last_name', 'email', 'phone', 'address']