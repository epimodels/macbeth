#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: __init__.py
# ------------------------------------------------------------
# This file contains the implementation of the User model.

# Unused imports as file is used to import items upstream
# flake8: noqa F401

from .user import User
from .serializers import UserSerializer
from .viewsets import UserViewSet
