#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: viewsets.py
# ------------------------------------------------------------
# Login and Register ViewSets

from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, RegisterSerializer
from macbeth_core.logging import log


class LoginViewSet(TokenObtainPairView, ModelViewSet):
    '''Login ViewSet for the :class: `account.User`.

    :param TokenObtainPairView: The base class viewset.
    :type TokenObtainPairView: class
    '''
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        log.info(f'Called with request: {request}, args: {args}, kwargs: {kwargs}')
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed as e:  # occurs when login information does not match a user
            log.exception(f'Authentication error: {e}', exc_info=True)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:  # occurs when missing a field in the data
            log.exception(f'Validation error: {e}', exc_info=True)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            log.exception(f'Unknown error: {e}', exc_info=True)
            return Response('Invalid token or user not found.', status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')

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
        log.info(f'Called with request: {request}, args: {args}, kwargs: {kwargs}')
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            res = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        except ValidationError as e:
            log.exception(f'Validation error: {e}', exc_info=True)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            log.exception(f'Unknown error: {e}', exc_info=True)
            return Response('Invalid token or user not found.', status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')

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
        log.info(f'Called with request: {request}, args: {args}, kwargs: {kwargs}')
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            log.exception(f'Unknown error: {e}', exc_info=True)
            return Response('Invalid token or user not foudn.', status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')
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
        log.info(f'Called with request: {request}')
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            log.exception(f'Unknown error: {e}', exc_info=True)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')
        return Response(status=status.HTTP_200_OK)
