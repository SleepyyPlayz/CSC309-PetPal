from rest_framework import permissions
from applications.models import PetApplication
from django.shortcuts import get_object_or_404
from comments.models import ApplicationComment


class IsApplicantOrShelter(permissions.BasePermission):
    """
    Custom permissions to only let the applicant or pet shelter owner to
    create comments.
    """

    def has_permission(self, request, view):
        application_id = view.kwargs['application_id']  # Use view.kwargs instead of self.kwargs
        application =  get_object_or_404(PetApplication, pk=application_id)
        applicant = application.applicant
        owner = application.pet.shelter.underlying_user
        parent_comment_id = request.data.get('parent_comment')


        if parent_comment_id:
            parent_comment = get_object_or_404(ApplicationComment, pk=parent_comment_id)
            if application != parent_comment.application:
                return False

        if request.user == applicant:
            return True
        
        if request.user == owner:
            return True     
        
        return False