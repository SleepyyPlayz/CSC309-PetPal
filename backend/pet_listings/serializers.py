from rest_framework import serializers
from pet_listings.models import PetListing, LANGUAGE_CHOICES, STYLE_CHOICES
from accounts.serializers import ShelterSerializer


class PetListingSerializer(serializers.ModelSerializer):
    shelter = ShelterSerializer(read_only=True)
    class Meta:
        model = PetListing
        fields = ['id', 'pet_name','species', 'age', 'location', 'breed', 'gender', 'status', 'shelter', 'pet_picture']