#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: user_manager.py
# ------------------------------------------------------------
# This class is what we should to create new users or access information
# about existing users. It uses a custom user model that overrides the
# default Django user model.

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    '''Custom user manager in which the unique identifier is the email.

    :param BaseUserManager: The base class manager :class: `UserManager`.
    :type BaseUserManager: class
    '''

    def create_user(self, email, password=None, **extra_fields):
        '''Creates and saves a new user.

        :param email: The email of the new user.
        :type email: str
        :param password: The password of the new user.
        :type password: str
        :param extra_fields: The extra fields of the new user.
        :type extra_fields: dict
        :return: The new user.
        :rtype: class: `account.User`
        '''
        if not email:
            raise ValueError(_('The email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        '''Creates and saves a new superuser.

        :param email: The email of the new superuser.
        :type email: str
        :param password: The password of the new superuser.
        :type password: str
        :return: The new superuser.
        :rtype: class: `account.User`
        '''
        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
