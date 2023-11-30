from rest_framework import permissions
from .models import Shelter, PetPalUser
from applications.models import PetApplication
from pet_listings.models import PetListing


class IsUserOrReadOnly(permissions.BasePermission):
    """
    Currently login user can access
    """

    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id
    
class ReceiverIsUser(permissions.BasePermission):
    """
    Currently login user can access
    """

    def has_object_permission(self, request, view, obj):
        return obj.receiver == PetPalUser.objects.get(id=request.user.id)
    
    
class IsShelterOrReadOnly(permissions.BasePermission):
    """
    Currently login shelter can access
    """
    def has_object_permission(self, request, view, obj):
        
        return obj.underlying_user == request.user
    

class HasActiveApplicationWithUser(permissions.BasePermission):
    """
    Shelter has active application with user
    """
    def has_object_permission(self, request, view, obj):
        if obj.id == request.user.id:
            return True
        
        if request.user.is_shelter == True:
            shelter_listings = PetListing.objects.filter(shelter = Shelter.objects.get(underlying_user = request.user))
            applications = PetApplication.objects.filter(pet__in=shelter_listings)
            for application in applications:
                if application.status == 'pending' and application.applicant == obj:
                    return True
        
        return False