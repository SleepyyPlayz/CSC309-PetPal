from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, PrimaryKeyRelatedField, HyperlinkedRelatedField
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import Shelter, PetPalUser

class BaseUserSerializer(ModelSerializer):
    id = PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = PetPalUser
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'location', 'phone_number', 'is_shelter', 'profile_picture']

    def validate_password(self, value: str) -> str:
        return make_password(value)


class ShelterSerializer(ModelSerializer):
    underlying_user = serializers.ReadOnlyField(source='underlying_user.username')
    class Meta:
        model = Shelter
        fields = ['underlying_user', 'name', 'address_line_1', 'address_line_2', 'postal_code']

