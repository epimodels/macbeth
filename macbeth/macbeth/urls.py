from django.urls import path
from .views import views # Should be renamed when we begin to write with context

urlpatterns = [
        path('', views.index, name='home'),
        ]
