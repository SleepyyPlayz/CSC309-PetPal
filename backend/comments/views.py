from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from comments.models import ApplicationComment, ReviewComment
from comments.serializers import ApplicationCommentSerializer, ReviewCommentSerializer
from applications.models import PetApplication
from rest_framework import permissions
from comments.permissions import IsApplicantOrShelter
from accounts.models import Shelter
from django.shortcuts import get_object_or_404
from notifications.callbacks import create_notification
from django.urls import reverse


class ApplicationCommentList(generics.ListCreateAPIView):
    """
    Get or create comments for a pet application.
    Only accessible if user is the applicant or shelter owner of the pet.
    """
    serializer_class = ApplicationCommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsApplicantOrShelter]

    def get_queryset(self):
        application_id = self.kwargs['application_id']
        return ApplicationComment.objects.filter(application_id=application_id)
    
    def perform_create(self, serializer):
        application_id = self.kwargs['application_id']
        parent_comment_id = self.request.data.get('parent_comment')
        application = get_object_or_404(PetApplication, pk=application_id)
    
        if parent_comment_id:
            parent_comment = get_object_or_404(ApplicationComment, pk=parent_comment_id)
            serializer.save(user=self.request.user, application=application, application_id=application_id, parent_comment=parent_comment)
        else:
            serializer.save(user=self.request.user, application=application, application_id=application_id)
        
        applicant = application.applicant
        owner = application.pet.shelter.underlying_user
        if self.request.user == applicant:
            receiver_id = owner.id
            n_type = "alert"
            message = f"{applicant.first_name} has commented on the {application.pet.pet_name} application."
            link = reverse('app_comment_list', kwargs={'application_id': application_id})
        else:
            receiver_id = applicant.id
            n_type = "alert"
            message = f"{owner.first_name} has commented on the {application.pet.pet_name} application."
            link = reverse('app_comment_list', kwargs={'application_id': application_id})

        create_notification(receiver_id=receiver_id, n_type=n_type, message=message, link=link)
        application.save()

        return super().perform_create(serializer)
    

class ReviewCommentList(generics.ListCreateAPIView):
    """
    Get or create review comments for a pet shelter.
    Accessible to all logged in users.
    """
    serializer_class = ReviewCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        shelter_id = self.kwargs['shelter_id']
        return ReviewComment.objects.filter(shelter_id=shelter_id)

    def perform_create(self, serializer):
        shelter_id = self.kwargs['shelter_id']
        parent_comment_id = self.request.data.get('parent_comment')
        shelter = get_object_or_404(Shelter, pk=shelter_id)
    
        if parent_comment_id:
            parent_comment = get_object_or_404(ReviewComment, pk=parent_comment_id)
            serializer.save(user=self.request.user, shelter=shelter, shelter_id=shelter_id, parent_comment=parent_comment)
        else:
            serializer.save(user=self.request.user, shelter=shelter, shelter_id=shelter_id)

        receiver_id = shelter.underlying_user.id
        reviewer = self.request.user
        n_type = "alert"
        message = f"{reviewer.first_name} has commented on the {shelter.name} shelter."
        link = reverse('review_comment_list', kwargs={'shelter_id': shelter_id})

        create_notification(receiver_id=receiver_id, n_type=n_type, message=message, link=link)
        
        return super().perform_create(serializer)


    

    

