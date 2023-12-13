from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password

class PetPalUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Please provide a valid e-mail address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        return self._create_user(email, password, **extra_fields)


class PetPalUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    location = models.CharField(max_length=500)
    phone_number = models.CharField(null=True, validators=[RegexValidator(r'^\d{3}-\d{3}-\d{4}$')], max_length=13)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_shelter = models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS =['first_name', 'last_name', 'phone_number', 'location', 'is_shelter']

    class Meta:
        verbose_name = 'PetPalUser'
        verbose_name_plural = 'PetPalUsers'

    objects = PetPalUserManager()
    def __str__(self):
        return self.email
    