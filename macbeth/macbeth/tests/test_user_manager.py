#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_account.py
# ------------------------------------------------------------

from django.contrib.auth import get_user_model
from django.test import TestCase
from parameterized import parameterized


class TestUserManager(TestCase):

    User = get_user_model()

    @parameterized.expand(
        ['foo@bar.com', 'foobar', '07/13/1986', 'Alex', 'Smith', ],
        )
    def test_create_user(
        self, email, password, date_of_birth,
        firstname, lastname, **extra_fields,
    ):
        user = self.User.objects.create_user(
            email=email,
            password=password,
            firstname=firstname,
            lastname=lastname,
            date_of_birth=date_of_birth,
            **extra_fields,
            )

        optionals = {
            'is_active': (user.is_active, True),
            'is_staff': (user.is_staff, False),
            'is_superuser': (user.is_superuser, False),
        }

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.firstname, firstname)
        self.assertEqual(user.lastname, lastname)
        # May have to be a date object
        self.assertEqual(user.date_of_birth, date_of_birth)
        for key, value in optionals.items():
            self.assertEqual(value[0], value[1] if (
                is_ := extra_fields.get(key, None)
                ) is None
                else is_
                )
        return
