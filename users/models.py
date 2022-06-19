import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomerManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, password, **other_fields):

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **other_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, first_name, last_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password, **other_fields)


class Customer(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    first_name = models.CharField(max_length=25)
    middle_name = models.CharField(max_length=25, null=True, blank=True)
    last_name = models.CharField(max_length=25)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=200)

    joined_date = models.DateField(auto_now_add=True)

    is_staff = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomerManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    