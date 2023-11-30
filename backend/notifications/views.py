from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Notification
from .serializers import NotificationSerializer

from accounts.permissions import IsUserOrReadOnly, ReceiverIsUser

import django_filters


# Create your views here.


class NotificationsList(generics.ListAPIView):
    serializer_class = NotificationSerializer

    # TODO: check for filtering for unread notifications
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['unread']

    permission_classes = [IsUserOrReadOnly]

    def get_queryset(self):
        # return super().get_queryset()
        return Notification.objects.filter(receiver=self.request.user)


class NotificationsGetDelete(generics.RetrieveDestroyAPIView):
    queryset = Notification.objects.all()

    serializer_class = NotificationSerializer
    permission_classes = [ReceiverIsUser]

    