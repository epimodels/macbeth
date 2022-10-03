#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_auth.py
# ------------------------------------------------------------
# Tests Login Register Blacklist ViewSet

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from parameterized import parameterized


REGISTER_URL = '/api/auth/register/'
LOGIN_URL = '/api/auth/login/'


def _register_info():
    return [
        ({
            'email': 'test@test.com',
            'nickname': 'test',
            'password': 'testtest',
            'over13': True,
        }, status.HTTP_201_CREATED),
        ({
            'email': 'test@test.com',
            'nickname': 'test',
            'password': '123',
            'over13': True,
        }, status.HTTP_400_BAD_REQUEST,
            [('password', 'Ensure this field has at least 8 characters.')]),
        ({
            'email': 'test',
            'nickname': 'test',
            'password': 'testtest',
            'over13': True,
        }, status.HTTP_400_BAD_REQUEST,
            [('email', 'Enter a valid email address.')]),
        ({
            'email': 'test@test.com',
            'nickname': '',
            'password': 'testtest',
            'over13': True,
        }, status.HTTP_400_BAD_REQUEST,
            [('nickname', 'This field may not be blank.')]),
        ({
            'email': 'test@test.com',
            'nickname': 'test',
            'password': 'testtest',
            'over13': '',
        }, status.HTTP_400_BAD_REQUEST,
            [('over13', 'Must be a valid boolean.')]),
        ({
            'email': 'test@test.com',
            'nickname': 'fbersbfgurbsdfgbrusdbygrsbdygrydsogvbyrdsxygb' +
                        'ydsigbysdogyisdrybgoirsdbygiosdrbygirbdsiogby' +
                        'sdrgbyrsdbygrsdobyguirdsyugbrdshvbyusbgvuyrdg' +
                        'scfyvrhdtsersmdbgcfysevnj5senhktjgbvsnrhygcfv' +
                        'dkgsdyrhtvguyrkhsneyfugvesgnkvrsyvjsjdkmrknvj' +
                        'yhg5d7hjyg8snfgviwevtgmwlmhgilrsvbdkgnriosdvg' +
                        'hksuhgwemjhv5lsehmvyo,4eot875473965492386y567' +
                        '86856787^&^*@&$*&^$(B$@ $JK@BF& ($CX@IQ',
            'password': 'testtest',
            'over13': True,
        }, status.HTTP_400_BAD_REQUEST,
            [('nickname', 'Ensure this field has no more than 128 characters.')]),
        ({
            'email': 't',
            'nickname': 'test',
            'password': '123',
            'over13': True,
        }, status.HTTP_400_BAD_REQUEST,
            [
                ('email', 'Enter a valid email address.'),
                ('password', 'Ensure this field has at least 8 characters.'),
            ],
        ),
        ({
            'email': '',
            'password': '',
            'nickname': '',
            'over13': '',
        }, status.HTTP_400_BAD_REQUEST,
            [
                ('email', 'This field may not be blank.'),
                ('password', 'This field may not be blank.'),
                ('nickname', 'This field may not be blank.'),
                ('over13', 'Must be a valid boolean.'),
            ],
        ),
    ]


class TestRegisterView(APITestCase):
    @parameterized.expand(_register_info)
    def test_register(self, user_data, expected_status, errors=None):
        response = self.client.post(REGISTER_URL, user_data)
        self.assertEqual(response.status_code, expected_status)
        if errors:
            for field, message in errors:
                self.assertEqual(response.data[field][0].__str__(), message)


def _login_info():
    return [
        ({
            'email': 'test@test.com',
            'password': 'testtest',
        }, status.HTTP_200_OK),
    ]


class TestLoginView(APITestCase):
    def setUp(self):
        self.client.post(REGISTER_URL, {
            'email': 'test@test.com',
            'nickname': 'test',
            'password': 'testtest',
            'over13': True,
        })

    @parameterized.expand(_login_info)
    def test_login(self, user_data, expected_status, errors=None):
        self.client.logout()
        response = self.client.post(LOGIN_URL, user_data)
        self.assertEqual(response.status_code, expected_status)
        if errors:
            for field, message in errors:
                self.assertEqual(response.data[field][0].__str__(), message)
