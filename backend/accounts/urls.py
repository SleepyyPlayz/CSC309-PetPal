from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name="accounts"
urlpatterns = [
    path('user/', views.PetPalUserCreate.as_view()),
    path('shelter/', views.ShelterCreate.as_view()),
    path('shelter/<int:pk>/profile/', views.ShelterEdit.as_view()), # Edit/delete shelter
    path('shelter/<int:pk>/', views.ShelterRetrieve.as_view()),
    path('user/<int:pk>/profile/', views.PetPalUserEdit.as_view()), #Edit, Delete patch user profile (logged in user only)
    path('user/<int:pk>/', views.PetPalUserRetrieve.as_view()), #Retrieve User Profile 
    path('shelters/', views.ShelterList.as_view()), #Shelter list
    path('super/users/', views.AdminPetPalUserList.as_view()),
]
