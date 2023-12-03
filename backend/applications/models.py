from django.db import models
from pet_listings.models import PetListing
from accounts.models.petpaluser import PetPalUser
from django.utils import timezone

APPLICATION_STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('accepted', 'Accepted'),
    ('denied', 'Denied'),
    ('withdrawn', 'Withdrawn'), 
)

LIVING_ACCOMMODATION = (
    ('house', 'House'),
    ('apartment', 'Apartment'),
    ('condo', 'Condo'), 
)

RENT_OWN_OR = (
    ('own', 'Own'),
    ('rent', 'Rent'),
    ('live_in', 'Live with Parents'), 
)

class PetApplication(models.Model):
    id = models.AutoField(primary_key=True)
    applicant = models.ForeignKey(PetPalUser, on_delete=models.CASCADE)
    pet = models.ForeignKey(PetListing, on_delete=models.CASCADE)
    status = models.CharField(max_length=30, choices=APPLICATION_STATUS_CHOICES, default='pending')
    age = models.PositiveIntegerField()
    accommodation = models.CharField(max_length=10, choices=LIVING_ACCOMMODATION)
    rent_own_or = models.CharField(max_length=10, choices=RENT_OWN_OR)
    has_permission_to_keep_pets = models.BooleanField()
    previous_pets = models.CharField(max_length=1000)
    hours_available_for_pet = models.PositiveIntegerField()
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Update 'updated_at' field with current time when object is saved.
        self.updated_at = timezone.now()
        if not self.id:
            self.created_at = timezone.now()
        return super().save(*args, **kwargs)

    