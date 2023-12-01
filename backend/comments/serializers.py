from rest_framework import serializers
from comments.models import ApplicationComment, ReviewComment, BlogComment
from applications.serializers import PetApplicationSerializer
from accounts.serializers import ShelterSerializer
from shelter_blogs.serializers import ShelterBlogSerializer

class ApplicationCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    application = PetApplicationSerializer(read_only=True)

    class Meta:
        model = ApplicationComment
        fields = ['id', 'text', 'user', 'parent_comment', 'replies', 'application']
    
    def get_replies(self, obj): 
        serializer = ApplicationCommentSerializer(obj.replies.all(), many=True)
        return serializer.data
    
class ReviewCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    shelter = ShelterSerializer(read_only=True)

    class Meta:
        model = ReviewComment
        fields = ['id', 'text', 'user', 'parent_comment', 'replies', 'shelter', 'rating']

    def get_replies(self, obj): 
        serializer = ReviewCommentSerializer(obj.replies.all(), many=True)
        return serializer.data
    
class BlogCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    blog = ShelterBlogSerializer(read_only=True)

    class Meta:
        model = BlogComment
        fields = ['id', 'text', 'user', 'parent_comment', 'replies', 'blog']
    
    def get_replies(self, obj): 
        serializer = BlogCommentSerializer(obj.replies.all(), many=True)
        return serializer.data