from django.urls import path
from django.views.generic import TemplateView
from .views import showModelList, results, chosen_model_form

app_name = "macbeth_backend"

urlpatterns = [
    path('', TemplateView.as_view(template_name="backend/index.html"), name="index"),
    path('compute', showModelList),
    path('compute/<int:model_id>', chosen_model_form),
]
