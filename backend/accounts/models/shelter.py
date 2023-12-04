from django.db import models
from .petpaluser import PetPalUser

class Shelter(models.Model):
    underlying_user = models.OneToOneField(PetPalUser, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=40, blank=True)
    address_line_1 = models.CharField(max_length=200, blank=True)
    address_line_2 = models.CharField(max_length=200, blank=True)
    postal_code = models.CharField(max_length=6, blank=True)

    def __str__(self):
        return self.name