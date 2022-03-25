#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: account.py
# ------------------------------------------------------------
# The implementation of User to be used in the project.

from .serializers import UserSerializer
from .user import User

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    '''ViewSet for the :class: `account.User`.

    :param viewsets.ModelViewSet: The base class viewset.
    :type viewsets.ModelViewSet: class
    '''

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
