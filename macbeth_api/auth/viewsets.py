#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: viewsets.py
# ------------------------------------------------------------
# Login and Register ViewSets

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

from .serializers import LoginSerializer, RegisterSerializer


class LoginViewSet(TokenObtainPairView, ModelViewSet):
    '''Login ViewSet for the :class: `account.User`.

    :param TokenObtainPairView: The base class viewset.
    :type TokenObtainPairView: class
    '''
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegisterViewSet(ModelViewSet, TokenObtainPairView):
    '''Register ViewSet for the :class: `account.User`.

    :param ModelViewSet: The base class viewset.
    :type ModelViewSet: class
    '''
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response({
            'user': serializer.data,
            'refresh': res['refresh'],
            'token': res['access'],
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    '''Refresh ViewSet for the :class: `account.User`.

    :param viewsets.ViewSet: The base class viewset.
    :type viewsets.ViewSet: class
    '''
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class BlacklistTokenViewSet(viewsets.ViewSet):
    '''Blacklist Token ViewSet for the :class: `account.User`.
    Blacklists the refresh token to force user to login

    :param viewsets.ViewSet: The base class viewset.
    :type viewsets.ViewSet: class
    '''
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)