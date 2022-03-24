from django.urls import path
from .views import views # Should be renamed when we begin to write with context

urlpatterns = [
        path('', views.index, name='home'),
        path('compute', views.showModelList),
        path('compute/<int:model_id>', views.chosen_model_form),
        path('compute/<int:model_id>/results', views.results),
        ]
