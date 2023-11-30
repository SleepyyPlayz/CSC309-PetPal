from rest_framework import serializers
from .models import PetApplication
from pet_listings.serializers import PetListingSerializer

class PetApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetApplication
        fields = '__all__'


class UserApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PetApplication
        fields = '__all__'

class ShelterApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PetApplication
        fields = '__all__'
