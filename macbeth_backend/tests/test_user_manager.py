#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_account.py
# ------------------------------------------------------------

from django.contrib.auth import get_user_model
from django.test import TestCase
from parameterized import parameterized


def account_test_cases():
    return [
        (
            'foo@bar.com', 'foobar',
            '1986-08-12', 'Alex', 'Smith',
        ),
        (
            'tester@myprovider.com', 'mypassword',
            '2000-01-10', 'Tester', 'McTester',
        ),
    ]


def account_test_cases_emails():
    test_cases = account_test_cases()
    emails = []
    for test_case in test_cases:
        emails.append((test_case[0],))
    return emails


class TestUserManager(TestCase):

    def setUp(self):
        self.User = get_user_model()
        for email, password, dob, firstname, lastname in account_test_cases():
            self.User.objects.create_user(
                email=email,
                password=password,
                **{
                    'date_of_birth': dob,
                    'firstname': firstname,
                    'lastname': lastname,
                }
            )

    @parameterized.expand(account_test_cases)
    def test_create_user(
        self, email, password, date_of_birth,
        firstname, lastname,
    ):
        '''Tests the creation of a new basic user.'''
        user = self.User.objects.create_user(
            email=email, password=password,
            firstname=firstname, lastname=lastname,
            date_of_birth=date_of_birth,
            )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.firstname, firstname)
        self.assertEqual(user.lastname, lastname)
        self.assertEqual(user.date_of_birth, date_of_birth)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        return

    @parameterized.expand(account_test_cases)
    def test_create_superuser(
        self, email,
        password, date_of_birth,
        firstname, lastname,
    ):
        '''Tests the creation of a new superuser.'''
        user = self.User.objects.create_superuser(
            email=email, password=password,
            firstname=firstname, lastname=lastname,
            date_of_birth=date_of_birth,
            )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.firstname, firstname)
        self.assertEqual(user.lastname, lastname)
        self.assertEqual(user.date_of_birth, date_of_birth)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_active)
        return

    @parameterized.expand(account_test_cases_emails)
    def test_get_user(self, email):
        user = self.User.objects.get(email=email)
        self.assertEqual(user.email, email)
        return

    @parameterized.expand([
        ('mynonexistentemail',),
        ('',),
        (' ',),
        ('invalidemail@email.com',),
    ])
    def test_get_user_invalid(self, email):
        with self.assertRaises(self.User.DoesNotExist):
            self.User.objects.get(email=email)
        return
