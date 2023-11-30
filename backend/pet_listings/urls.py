from django.urls import path

from . import views

urlpatterns = [
    path('', views.PetListingSearch.as_view()),
    path('<int:pk>/', views.PetListingDetail.as_view()),
]