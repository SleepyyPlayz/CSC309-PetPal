from django.urls import path

from . import views
from .views import like_post, check_like_status

urlpatterns = [
    path('', views.ShelterBlogList.as_view()),
    path('<int:pk>/', views.ShelterBlogDetail.as_view()),
    path('<int:post_id>/like/', like_post, name='like-post'),
    path('<int:post_id>/check-like/', check_like_status, name='check-like-status'),
]