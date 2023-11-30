from rest_framework import permissions

class IsApplicationForShelter(permissions.BasePermission):
    """
    Only allow the shelter the application is directed towards can access.
    """

    def has_object_permission(self, request, view, obj):
        # Check if user is a shelter and if the application for pet belongs to the shelter
        return request.user.is_shelter and obj.pet.shelter == request.user.shelter
    
class IsApplicationForUser(permissions.BasePermission):
    """
    Only allow the user of the application to access and update.
    """

    def has_object_permission(self, request, view, obj):
        
        # Check if user is the applicant of the application
        return request.user == obj.applicant

class CanUpdateApplicationStatus(permissions.BasePermission):
    """
    Allow updating the status of an application.
    """

    def has_object_permission(self, request, view, obj):
        # Only allow updates to the status field.
        if request.method == 'PATCH' and 'status' in request.data:
            # Check if the current status for the application is 'pending'
            current_status = obj.status
            if current_status != 'pending':
                return False
            
            
            new_status = request.data['status']
            if request.user.is_shelter:
                # Shelters can only update status to 'accepted' or 'denied'
                if new_status not in ['accepted', 'denied']:
                    return False
            else:
                # Users can only update status to 'withdrawn'
                if new_status != 'withdrawn':
                    return False
            
        return True

class CanViewOwnApplications(permissions.BasePermission):
    """
    Allow shelters to view their own applications.
    """

    def has_object_permission(self, request, view, obj):
        # Shelters can only view their own applications.
        return obj.shelter == request.user
    
    
class CanChangeLastUpdateTime(permissions.BasePermission):
    """
    Allow changing the update_at time when a new comment is added.
    """

    def has_permission(self, request, view):
        # Allow changes to update_at when comment is added
        return request.method == 'POST' and 'comment' in request.data