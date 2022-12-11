#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: account.py
# ------------------------------------------------------------
# The implementation of User to be used in the project.

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.management.utils import get_random_secret_key

from .user_manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    # https://docs.djangoproject.com/en/4.0/topics/auth/customizing/
    id = models.AutoField(primary_key=True)
    email = models.EmailField(
        _('email address'), max_length=32,
        unique=True,
        )
    secret_key = models.CharField(max_length=255, default=get_random_secret_key)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'

    def __str__(self) -> str:
        '''Returns the unique identifier of the :class: `account.User`.

        :return: the unique identifier.
        :rtype: str
        '''
        return self.email
