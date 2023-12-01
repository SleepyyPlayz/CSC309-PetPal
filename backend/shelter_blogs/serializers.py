from rest_framework import serializers
from shelter_blogs.models import ShelterBlog
from accounts.serializers import ShelterSerializer


class ShelterBlogSerializer(serializers.ModelSerializer):
    shelter = ShelterSerializer(read_only=True)
    class Meta:
        model = ShelterBlog
        fields = ('id', 'title', 'text', 'image', 'likes', 'shelter')