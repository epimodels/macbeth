#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: serializers.py
# ------------------------------------------------------------
# Login and Register Serializers

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

from macbeth_backend.models.account import User, UserSerializer


class LoginSerializer(TokenObtainPairSerializer):
    '''Login Serializer for the :class: `account.User`.

    :param TokenObtainPairSerializer: The base class serializer.
    :type TokenObtainPairSerializer: class
    '''

    @classmethod
    def get_token(cls, user):
        '''Returns the token of the :class: `account.User`.

        :param user: The user to get the token from.
        :type user: class: `account.User`
        :return: The token of the :class: `account.User`.
        :rtype: str
        '''
        token = super().get_token(user)
        update_last_login(None, user)
        return token

    def validate(self, attrs):
        '''Validates the data of the :class: `account.User`.

        :param attrs: The data to validate.
        :type attrs: dict
        :return: The validated data.
        :rtype: dict
        '''
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    '''Register Serializer for the :class: `account.User`.

    :param UserSerializer: The base class serializer.
    :type UserSerializer: class
    '''
    password = serializers.CharField(
        max_length=128, min_length=8,
        required=True, write_only=True
        )
    email = serializers.EmailField(max_length=128, required=True, write_only=True)
    firstname = serializers.CharField(max_length=128, required=True, write_only=True)
    lastname = serializers.CharField(max_length=128, required=True, write_only=True)
    date_of_birth = serializers.DateField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'firstname', 'lastname', 'date_of_birth', 'password',
                  'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login', )

    def create(self, validated_data):
        '''Creates the :class: `account.User`.

        :param validated_data: The validated data.
        :type validated_data: dict
        :return: The created :class: `account.User`.
        :rtype: class: `account.User`
        '''
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
