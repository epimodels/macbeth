#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: routers.py
# ------------------------------------------------------------
# Register the routers for the macbeth_api

from rest_framework.routers import SimpleRouter
from macbeth_backend.models.account import UserViewSet
from .auth.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet, BlacklistTokenViewSet
from .compute.viewsets import ComputeModelsViewSet

#from macbeth_backend.models.jobs.viewsets import 
from .jobs.viewsets import JobViewSet

routes = SimpleRouter()

routes.register(r'auth/login', LoginViewSet, basename='login')
routes.register(r'auth/register', RegisterViewSet, basename='register')
routes.register(r'auth/refresh', RefreshViewSet, basename='refresh')
routes.register(r'auth/logout', BlacklistTokenViewSet, basename='logout')

routes.register(r'user', UserViewSet, basename='user')

routes.register(r'compute/job', JobViewSet, basename='job_create')

routes.register(r'compute/models', ComputeModelsViewSet, basename='compute/models')

urlpatterns = [
    *routes.urls,
]
