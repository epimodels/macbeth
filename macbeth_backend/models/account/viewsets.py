#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: viewsets.py
# ------------------------------------------------------------
# The implementation of User to be used in the project.

from .serializers import UserSerializer
from .user import User

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    '''ViewSet for the :class: `account.User`.

    :param viewsets.ModelViewSet: The base class viewset.
    :type viewsets.ModelViewSet: class
    '''

    http_method_names = ['get', ]
    permission_classes = [IsAuthenticated, ]
    serializer = UserSerializer
    filter_backends = [filters.OrderingFilter, ]
    ordering_fields = ['updated', ]
    ordering = ['-updated', ]

    def get_queryset(self):
        '''Returns the queryset of the :class: `account.User`.

        :return: The queryset of the :class: `account.User`.
        :rtype: class: `django.db.models.query.QuerySet`
        '''
        if self.request.user.is_superuser:
            return User.objects.all()
        return None

    def get_object(self):
        '''Returns the object of the :class: `account.User`.

        :return: The object of the :class: `account.User`.
        :rtype: class: `account.User`
        '''
        lookup_field_value = self.kwargs(self.lookup_field)
        obj = User.objects.get(pk=lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj
