#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: viewsets.py
# ------------------------------------------------------------
# Login and Register ViewSets

from macbeth_api.auth.google_validation import google_validate_token_id

from macbeth_backend.models import User
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import LoginSerializer
from macbeth_core.logging import log

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


def get_or_create_user(*, email, **extra_data):
    user = User.objects.filter(email=email).first()

    if user:
        return user, False

    return User.objects.create_user(email=email, **extra_data), True


def jwt_get_token(*, response, user):
    refresh = RefreshToken.for_user(user)
    response = Response({
        'user': user.email,
        'refresh': str(refresh),
        'access': str(refresh.access_token)},
        status=status.HTTP_200_OK
    )
    return response


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
            token_id = request.headers.get('Authorization')
            google_validate_token_id(token_id=token_id)

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user, _ = get_or_create_user(email=serializer.validated_data['email'])
            response = Response(serializer.validated_data, status=status.HTTP_200_OK)
            response = jwt_get_token(response=response, user=user)
        except ValidationError as e:
            log.error(f'Validation error: {e}', exc_info=True)
            return Response('Invalid token or user not found.', status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            log.error(f'Unknown error: {e}', exc_info=True)
            return Response('Invalid token or user not found.', status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')

        return response


class RefreshViewSet(ViewSet, TokenRefreshView):
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
        except ValidationError as e:
            log.exception(f'Validation error: {e}', exc_info=True)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e:
            log.exception(f'Token error: {e}', exc_info=True)
            return Response('Token is invalid or expired.', status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            log.exception(f'Unknown error: {e}', exc_info=True)
            return Response('Invalid token or user not found.', status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class BlacklistTokenViewSet(ViewSet):
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
        except TokenError as e:
            log.exception(f'Token error: {e}', exc_info=True)
            return Response('Token is invalid or blacklisted.', status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            log.exception(f'Unknown error: {e}', exc_info=True)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')
        return Response(status=status.HTTP_200_OK)
