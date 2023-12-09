from rest_framework import serializers
from .models import PetApplication
from pet_listings.serializers import PetListingSerializer
from accounts.serializers import BaseUserSerializer

class PetApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.ReadOnlyField(source='applicant.id')
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
