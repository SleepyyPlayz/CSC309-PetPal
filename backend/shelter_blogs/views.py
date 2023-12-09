from django.shortcuts import render
from shelter_blogs.models import ShelterBlog, Like
from shelter_blogs.serializers import ShelterBlogSerializer
from rest_framework import generics
from rest_framework import permissions
from shelter_blogs.permissions import IsShelterOwnerOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404



class ShelterBlogList(generics.ListCreateAPIView):
    queryset = ShelterBlog.objects.all()
    serializer_class = ShelterBlogSerializer
    permission_classes = [permissions.IsAuthenticated, IsShelterOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(shelter=self.request.user.shelter)
        return super().perform_create(serializer)
    

class ShelterBlogListView(generics.ListAPIView):
    serializer_class = ShelterBlogSerializer
    permission_classes = [permissions.IsAuthenticated, IsShelterOwnerOrReadOnly]

    def get_queryset(self):
        shelter_id = self.kwargs['shelter_id']
        return ShelterBlog.objects.filter(shelter__underlying_user=shelter_id)
    

class ShelterBlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShelterBlog.objects.all()
    serializer_class = ShelterBlogSerializer
    permission_classes = [permissions.IsAuthenticated, IsShelterOwnerOrReadOnly]


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_post(request, post_id):
    user = request.user
    post = ShelterBlog.objects.get(id=post_id)

    # Check if the user has already liked the post
    existing_like = Like.objects.filter(user=user, post=post).first()

    if existing_like:
        # User has already liked the post, remove the like
        existing_like.delete()
        post.likes -= 1
        post.save()
        return Response({'message': 'Like removed successfully'})
    else:
        # User has not liked the post, add a new like
        Like.objects.create(user=user, post=post)
        post.likes += 1
        post.save()
        return Response({'message': 'Post liked successfully'})
    

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_like_status(request, post_id):
    user = request.user
    post = get_object_or_404(ShelterBlog, pk=post_id)
    has_liked = Like.objects.filter(user=user, post=post).exists()

    return Response({'has_liked': has_liked})


