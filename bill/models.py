import uuid

from django.db import models

from users.models import Customer
from parts.models import Part

class Bill(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(Customer, related_name='user_bill', on_delete=models.CASCADE)
    part = models.ManyToManyField(Part, related_name='car_parts_bill')

    notes = models.TextField(null=True, blank=True)

    total_price = models.DecimalField(max_digits=15, decimal_places=2)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bill for: {self.user.email} on {self.created}"
    