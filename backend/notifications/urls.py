from django.urls import path
from . import views

app_name = 'notifications'

urlpatterns = [
    path('', views.NotificationsList.as_view()),
    path('<int:pk>/', views.NotificationsGetDelete.as_view()),
]

