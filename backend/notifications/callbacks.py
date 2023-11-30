from .models import Notification
from accounts.models import PetPalUser


def create_notification(receiver_id: int, n_type: str, message: str, link):
    '''
        Creates notification based on the parameters given:
         - receiver_id: the ID (primary key) of the user that receives the notification
         - n_type: the type of the notification, please reference notifications/models.py for valid choices
         - message: the message in the notification
         - link: the link to the page the notification redirects to
    '''
    receiver = PetPalUser.objects.get(id=receiver_id)
    Notification.objects.create(receiver=receiver, notification_type=n_type, message=message, link=link)
