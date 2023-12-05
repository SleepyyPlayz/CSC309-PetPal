from rest_framework import permissions


class IsShelterOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of a pet shelter create/edit pet listings.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_shelter
    
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.shelter.underlying_user == request.user
    
