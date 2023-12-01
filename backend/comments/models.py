from django.db import models
from rest_framework import serializers


# Create your models here.

class ApplicationComment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200)
    user =  models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE)
    application = models.ForeignKey('applications.PetApplication', on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    
    def __str__(self) -> str:
        return f'{self.user.email} - {self.text} - {self.created}'

    class Meta:
        ordering = ['-created']


class ReviewComment(models.Model):
    RATING_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    )

    created = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200)
    user =  models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE)
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    
    def __str__(self) -> str:
        return f'{self.user.email} - {self.text} - {self.rating} {self.created}'

    class Meta:
        ordering = ['-created']

class BlogComment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200)
    user =  models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE)
    blog = models.ForeignKey('shelter_blogs.ShelterBlog', on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    
    def __str__(self) -> str:
        return f'{self.user.email} - {self.text} - {self.created}'

    class Meta:
        ordering = ['-created']

