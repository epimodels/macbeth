#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_account.py
# ------------------------------------------------------------

from django.contrib.auth import get_user_model
from django.test import TestCase
from parameterized import parameterized


def account_normal_user_test_cases():
    return [
        (
            'foo@bar.com', 'foobar',
            'Alex', True,
        ),
        (
            'tester@myprovider.com', 'mypassword',
            'Tester', True,
        ),
    ]


def account_super_user_test_cases():
    return [
        (
            'super@user.com', 'superuser',
            'SuperName', True,
        ),
    ]


def account_test_cases_emails():
    test_cases = account_super_user_test_cases() + account_normal_user_test_cases()
    emails = []
    for test_case in test_cases:
        emails.append((test_case[0],))
    return emails


class TestUserManager(TestCase):

    def setUp(self):
        self.User = get_user_model()
        reg_users = account_normal_user_test_cases()
        sup_users = account_super_user_test_cases()
        for email, password, nickname, over13 in reg_users:
            self.User.objects.create_user(
                email=email,
                password=password,
                **{
                    'nickname': nickname,
                    'over13': over13,
                }
            )

        for email, password, nickname, over13 in sup_users:
            self.User.objects.create_superuser(
                email=email,
                password=password,
                **{
                    'nickname': nickname,
                    'over13': over13,
                    'is_superuser': True,
                }
            )

    @parameterized.expand(account_normal_user_test_cases)
    def test_normal_user(
        self, email, password, 
        nickname, over13,
    ):
        '''Tests the creation of a new basic user.'''
        user = self.User.objects.get(email=email, is_superuser=False)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.nickname, nickname)
        self.assertEqual(user.over13, over13)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        return

    @parameterized.expand(account_super_user_test_cases)
    def test_superuser(
        self, email, password, 
        nickname, over13,
    ):
        '''Tests the creation of a new superuser.'''
        user = self.User.objects.get(email=email, is_superuser=True)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.nickname, nickname)
        self.assertEqual(user.over13, over13)
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
