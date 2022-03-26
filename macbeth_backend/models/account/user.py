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

from .user_manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    # https://docs.djangoproject.com/en/4.0/topics/auth/customizing/
    id = models.AutoField(primary_key=True)
    email = models.EmailField(
        _('email address'), max_length=32,
        unique=True,
        )
    firstname = models.CharField(max_length=32)
    lastname = models.CharField(max_length=32)
    date_of_birth = models.DateField()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'date_of_birth', ]

    def __str__(self) -> str:
        '''Returns the unique identifier of the :class: `account.User`.

        :return: the unique identifier.
        :rtype: str
        '''
        return self.email

    def get_full_name(self) -> str:
        '''
        A longer formal identifier for the user such as their full name.
        If implemented, this appears alongside the username in an object's
        history in django.contrib.admin.

        :return: The firstname and lastname of the :class: `account.User`.
        :rtype: str
        '''
        return f'{self.firstname} {self.lastname}'

    def get_short_name(self) -> str:
        '''
        A short, informal identifier for the user such as their first name.
        If implemented, this replaces the username in the greeting to the user
        in the header of :class: `django.contrib.admin`.

        :return: The firstname of the :class: `account.User`.
        :rtype: str
        '''
        return self.firstname
