from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import exceptions
from ..models import PetPalUser, Shelter
from ..serializers import BaseUserSerializer, ShelterSerializer
from ..permissions import IsShelterOrReadOnly


class ShelterCreate(CreateAPIView):
    serializer_class = ShelterSerializer
    # Need to check if user is shelter
    def perform_create(self, serializer):
        if self.request.user.is_shelter:
            serializer.save(underlying_user=self.request.user)
            return super().perform_create(serializer)
        else:
            raise exceptions.ValidationError("Cannot create shelter for account not marked is_shelter")

class ShelterRetrieve(RetrieveAPIView):
    serializer_class = ShelterSerializer
    def get_queryset(self):
        return Shelter.objects.filter(underlying_user=self.kwargs['pk'])
    
class ShelterEdit(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsShelterOrReadOnly]
    serializer_class = ShelterSerializer
    def get_queryset(self):
       return Shelter.objects.filter(underlying_user=self.kwargs['pk'])
    
# Users can see a list of all shelters
class ShelterList(ListAPIView):
    serializer_class = ShelterSerializer
    def get_queryset(self):
        return Shelter.objects.all()
        

