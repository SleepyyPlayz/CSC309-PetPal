from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_user, \
                                logout as logout_user
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.generics import RetrieveAPIView, CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from ..models import PetPalUser 
from ..serializers import BaseUserSerializer, ShelterSerializer
from ..permissions import IsUserOrReadOnly, HasActiveApplicationWithUser

class PetPalUserCreate(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = BaseUserSerializer


# Need to add restriction on shelters only viewing user profile if they have an active application
class PetPalUserRetrieve(RetrieveAPIView):
    permission_classes = [HasActiveApplicationWithUser]
    serializer_class = BaseUserSerializer
    def get_queryset(self):
        return PetPalUser.objects.filter(id=self.kwargs['pk'])
    
class PetPalUserSelfRetrieve(RetrieveAPIView):
    permission_classes = [HasActiveApplicationWithUser]
    serializer_class = BaseUserSerializer
    def get_queryset(self):
        return PetPalUser.objects.filter(id=self.kwargs['pk'])
    
class PetPalUserEdit(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsUserOrReadOnly]
    serializer_class = BaseUserSerializer
    def get_queryset(self):
       return PetPalUser.objects.filter(id=self.kwargs['pk'])

    ''' def update(self, request, pk):
        user_object = self.get_object()
        new_data = request.data
        serializ = self.get_serializer(user_object, data=new_data)
        if 'location' not in request.data:
            serializ.data['location'] = user_object.location

        if serializ.is_valid():
            self.perform_update(serializ)
            return Response(serializ.validated_data)
        else:

            if 'email' not in serializ.validated_data:
                serializ.validated_data['email'] = user_object.email
            if 'phone_number' not in serializ.validated_data:
                serializ.validated_data['phone_number'] = user_object.phone_number
            if 'first_name' not in serializ.validated_data:
                serializ.validated_data['first_name'] = user_object.first_name
            if 'last_name' not in serializ.validated_data:
                serializ.validated_data['last_name'] = user_object.last_name

            if serializ.is_valid():
                self.perform_update(serializ)
                return Response(serializ.data)
        */
'''
class AdminPetPalUserList(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = BaseUserSerializer
    def get_queryset(self):
        return PetPalUser.objects.all()