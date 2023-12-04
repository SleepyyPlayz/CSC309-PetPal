from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models.petpaluser import PetPalUser
from rest_framework.serializers import ValidationError


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        data.update({'id': self.user.id})
        return data