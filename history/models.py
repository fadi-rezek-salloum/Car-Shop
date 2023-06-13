import uuid

from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from users.models import Customer

class History(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    item_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item = GenericForeignKey('item_type', 'item_id')
    created = models.DateTimeField(auto_now_add=True)

    # def get_item_type(self):
    #     return self.item_type.name
    
    # def get_item_name(self):
    #     return self.item.name
    
    # def get_item_is_sold(self):
    #     try:
    #         if self.item_type.name == 'car':
    #             if self.item.id == self.item.sellcar_set.first().car.id:
    #                 return True
    #             else:
    #                 return False
    #     except:
    #         return False

    def __str__(self):
        return self.customer.first_name + ' ' + self.customer.last_name