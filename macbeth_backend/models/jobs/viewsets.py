

from .serializers import JobSerializer
from .job import Job

from rest_framework import viewsets
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated


class JobViewSet(viewsets.ModelViewSet):

    http_method_names = ['get', 'post']
    permission_classes = [IsAuthenticated, ]
    serialzer = JobSerializer
    filter_backends = [filters.OrderingFilter, ]
    ordering_fields = ['created_on', ]
    ordering = ['-created_on', ]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Job.objects.all()
        return None

    def get_object(self):
        lookup_field_value = self.kwargs(self.lookup_field)
        obj = Job.objects.get(pk=lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj