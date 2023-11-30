from django.contrib import admin
from comments.models import ApplicationComment, ReviewComment

# Register your models here.
admin.site.register(ApplicationComment)
admin.site.register(ReviewComment)
