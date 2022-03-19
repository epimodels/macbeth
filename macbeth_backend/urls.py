from django.urls import path
from django.views.generic import TemplateView

app_name = "macbeth_backend"

urlpatterns = [
    path('', TemplateView.as_view(template_name="backend/index.html"), name="index"),
]