from django.db import models
from accounts.models import PetPalUser, Shelter


NOTIFICATION_TYPES = [
    ('default', 'Default'),
    ('error', 'Error'),
    ('alert', 'Alert'),
    ('checkmark', 'Checkmark'),
]


class Notification(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    receiver = models.ForeignKey(PetPalUser, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, default='default')
    message = models.TextField(max_length=200)
    link = models.URLField(null=True, blank=True)
    unread = models.BooleanField(default=True)  # whether the notification has NOT been read

    class Meta:
        ordering = ['-created']  # default ordering: newest first
