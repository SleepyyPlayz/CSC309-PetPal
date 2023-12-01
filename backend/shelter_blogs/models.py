from django.db import models

class ShelterBlog(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=500)
    likes = models.IntegerField(default=0)
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog_pics/', null=True, blank=True)

    def __str__(self) -> str:
        return self.title
    
class Like(models.Model):
    user = models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE)
    post = models.ForeignKey(ShelterBlog, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} likes {self.post.title}'
