#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: viewsets.py
# ------------------------------------------------------------
# Job ViewSet

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .serializers import JobSerializer
from macbeth_backend.models.jobs.job import Job


class JobViewSet(ModelViewSet):
    '''ViewSet for the Job model
    '''
    serializer_class = JobSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post', 'get']

    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = serializer.save()

        return Response({
            'job_id': job.id,
        }, status=status.HTTP_201_CREATED)

    # Get needs to be added here
    def retrieve(self, request, pk=None):
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(job)
        return Response(serializer.data)
