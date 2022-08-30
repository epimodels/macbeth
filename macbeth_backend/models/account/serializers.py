#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: serializer.py
# ------------------------------------------------------------
# Serializer allows us to more easily convert our objects to JSON.
# This will be helpful when we want to send data to the frontend.
# Information can be found here:
# https://www.django-rest-framework.org/api-guide/serializers/#modelserializer

from . import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    '''Serializer for the :class: `account.User`.

    :param serializers.ModelSerializer: The base class serializer.
    :type serializers.ModelSerializer: class
    '''

    class Meta:
        '''Meta class for the :class: `account.UserSerializer`.'''
        model = User
        fields = (
            'email', 'nickname',
            'over13', 'is_active', 'is_staff',
            'is_superuser', 'date_joined',
        )
        read_only_fields = (
            'date_joined',
            'is_active', 'is_staff', 'is_superuser',
        )
