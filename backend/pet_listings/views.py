from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from pet_listings.models import PetListing
from pet_listings.serializers import PetListingSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import generics
import django_filters
from rest_framework import permissions
from pet_listings.permissions import IsShelterOwnerOrReadOnly

    
class PetListingSearch(generics.ListCreateAPIView):
    """
    Search for a specific pet listing using either filters or sorting orders.
    Create a pet listing if a shelter.
    """
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['shelter', 'status', 'breed', 'species', 'age']
    ordering_fields = ['pet_name', 'age']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsShelterOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            queryset = queryset.order_by(ordering)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(shelter=self.request.user.shelter)
        return super().perform_create(serializer)


class PetListingDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Get details, update, or delete a pet listing.
    """
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsShelterOwnerOrReadOnly]
        