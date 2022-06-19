from django.db import models

from users.models import Customer

class Help(models.Model):

    user = models.ForeignKey(Customer, on_delete=models.CASCADE)

    lng = models.CharField(max_length=15)
    lat = models.CharField(max_length=15)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} requested help in {self.lng} / {self.lat}"
    