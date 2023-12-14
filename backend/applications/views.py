from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import PetApplication
from .permissions import IsApplicationForUser, CanUpdateApplicationStatus, IsNotAShelter
from .permissions import CanViewOwnApplications, IsApplicationForShelter, CanViewOwnApplicationUser
from .serializers import PetApplicationSerializer
from .filters import ApplicationFilter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions, exceptions
import django_filters

class NewPetApplication(generics.CreateAPIView):
    queryset = PetApplication.objects.all()
    permission_classes = [IsNotAShelter]
    serializer_class = PetApplicationSerializer

    def perform_create(self, serializer):
        #Check if the pet listing is available
        pet_listing = serializer.validated_data['pet']
        #Set current user as the applicant and save application
        if pet_listing.status == 'available':
            serializer.save(applicant=self.request.user)
        
            return super().perform_create(serializer)
        else:
            raise exceptions.ValidationError("Cannot apply to a pet listing not marked available")

class FilledAppUserView(generics.RetrieveUpdateAPIView):
    queryset = PetApplication.objects.all()
    permission_classes = [IsApplicationForUser, CanUpdateApplicationStatus]
    serializer_class = PetApplicationSerializer

class FilledAppShelterView(generics.RetrieveUpdateAPIView):
    queryset = PetApplication.objects.all()
    permission_classes = [IsApplicationForShelter, CanUpdateApplicationStatus]
    serializer_class = PetApplicationSerializer

    # # Update pet listing status to adopted if application status is accepted
    # def perform_update(self, serializer):
    #     if serializer.validated_data.get('status') == 'accepted':
    #         pet_listing = serializer.validated_data['pet']
    #         pet_listing.status = 'adopted'
    #         pet_listing.save()
    #     return super().perform_update(serializer)

class PetApplicationListView(generics.ListAPIView):
    serializer_class = PetApplicationSerializer
    permission_classes = [CanViewOwnApplications]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = ApplicationFilter
    filterset_fields = ['status']
    ordering_fields = ['created_at', 'updated_at']


    def get_queryset(self):
        queryset = PetApplication.objects.filter(pet__shelter = self.request.user.id)
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            queryset = queryset.order_by(ordering)
        
        return queryset


class PetApplicationListViewUser(generics.ListAPIView):
    queryset = PetApplication.objects.all()
    serializer_class = PetApplicationSerializer
    permission_classes = [CanViewOwnApplicationUser]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = ApplicationFilter
    filterset_fields = ['status']
    ordering_fields = ['created_at', 'updated_at']

   

    def get_queryset(self):
        queryset = PetApplication.objects.filter(applicant = self.request.user.id)
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            queryset = queryset.order_by(ordering)
        
        return queryset
    

