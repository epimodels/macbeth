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
from macbeth_core.logging import log

import zmq

context = zmq.Context()
assignment_socket = context.socket(zmq.PUSH)
assignment_socket.bind('tcp://*:8888')


class JobViewSet(ModelViewSet):
    '''ViewSet for the Job model
    '''
    serializer_class = JobSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post', 'get']

    def create(self, request, *args, **kwargs):
        log.info(f'Called with request: {request}, args: {args}, kwargs: {kwargs}')
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            newjob = serializer.save()
            assignment_socket.send_string(f"{newjob.id}")
            log.info(f'Dispatching job {newjob.id}')
            return Response({
                'job_id': newjob.id,
            }, status=status.HTTP_201_CREATED)

        except Exception:
            log.exception('Failed to create job.', exc_info=True)
            return Response({
                'error': 'Failed to create job.',
            }, status=status.HTTP_400_BAD_REQUEST)

        finally:
            log.info('Finished')

    # Get needs to be added here
    def retrieve(self, request, pk=None):
        log.info(f'Called with request: {request}, pk: {pk}')
        try:
            queryset = Job.objects.all()
            job = get_object_or_404(queryset, pk=pk)
            serializer = self.get_serializer(job)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception:
            log.exception('Failed to retrieve job.', exc_info=True)
            return Response({
                'error': 'Failed to retrieve job.',
            }, status=status.HTTP_400_BAD_REQUEST)

        finally:
            log.info('Finished')
