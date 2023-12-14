from rest_framework import permissions

class IsShelterOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow shelters create/edit shelter blogs.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_shelter
    
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.shelter.underlying_user == request.user