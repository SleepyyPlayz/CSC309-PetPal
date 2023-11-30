import django_filters
from .models import PetApplication

class ApplicationFilter(django_filters.FilterSet):
    class Meta:
        model = PetApplication
        fields = ['status']

    
