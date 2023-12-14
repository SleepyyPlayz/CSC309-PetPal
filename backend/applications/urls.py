from django.urls import path
from .views import NewPetApplication, FilledAppShelterView, FilledAppUserView, PetApplicationListView, PetApplicationListViewUser

urlpatterns = [
    path("", NewPetApplication.as_view(), name="new-pet-application"),
    path("filled-applications/user/<int:pk>/", FilledAppUserView.as_view(), name="filled-applications-user"),
    path("filled-applications/shelter/<int:pk>/", FilledAppShelterView.as_view(), name="filled-applications-shelter"),
    path("filled-applications/shelter/list/", PetApplicationListView.as_view(), name="application-list"),
    path("filled-applications/user/list/", PetApplicationListViewUser.as_view(), name="application-list")

]

