from django.urls import path

from . import views

urlpatterns = [
    path("application/<int:application_id>/", views.ApplicationCommentList.as_view(), name="app_comment_list"),
    path("shelter/<int:shelter_id>/", views.ReviewCommentList.as_view(), name ="review_comment_list"),
    path("shelter_blog/<int:blog_id>/", views.BlogCommentList.as_view(), name ="blog_comment_list"),
]