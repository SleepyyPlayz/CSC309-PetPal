from django.db import models

from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from accounts.models.shelter import Shelter


# Create your models here.
LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

SPECIES = (
    ('dog', 'Dog'),
    ('cat', 'Cat'),
    ('bird', 'Bird'),
    ('rabbit', 'Rabbit'), 
)

STATUS = (
    ('available', 'Available'),
    ('adopted', 'Adopted'),
    ('pending', 'Pending'),
    ('withdrawn', 'Withdrawn')
)

GENDER = (
    ('male', 'Male'),
    ('female', 'Female')
)

class PetListing(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    pet_name = models.CharField(max_length=30)
    species = models.CharField(max_length=30, choices=SPECIES)
    age = models.PositiveIntegerField()
    location = models.CharField(max_length=200)
    breed = models.CharField(max_length=30)
    gender = models.CharField(max_length=30, choices=GENDER)
    status = models.CharField(default="available", max_length=30, choices=STATUS)
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE)
    pet_picture = models.ImageField(upload_to='pet_pictures/', null=True, blank=True)
    
    def __str__(self) -> str:
        return self.pet_name



