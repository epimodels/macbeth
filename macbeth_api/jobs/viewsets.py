
from rest_framework import status, viewsets
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import JobSerializer


class JobViewSet(ModelViewSet):
    '''ViewSet for the Job model
    '''
    serializer_class = JobSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post', ]

    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = serializer.save()

        return Response({
            'job_id': job.id,
        }, status=status.HTTP_201_CREATED)

    # Get needs to be added here
