#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_auth.py
# ------------------------------------------------------------
# Tests Login Register Blacklist ViewSet

from rest_framework import status
from rest_framework.test import APITestCase
from parameterized import parameterized


REGISTER_URL = '/api/auth/register/'
LOGIN_URL = '/api/auth/login/'
REFRESH_URL = '/api/auth/refresh/'
BLACKLIST_URL = '/api/auth/logout/'


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


def _refresh_info():
    return [
        (status.HTTP_200_OK,),
    ]


def _refresh_info_validation_error():
    return [
        (
            {},
            status.HTTP_400_BAD_REQUEST,
            [('refresh', 'This field is required.')],
        ),
    ]


def _refresh_info_invalid_token():
    return [
        (
            {'refresh': '5'},
            status.HTTP_401_UNAUTHORIZED,
            'Token is invalid or expired.',
        ),
    ]


class TestRefreshView(APITestCase):
    def setUp(self):
        response = self.client.post(REGISTER_URL, {
            "email": "test@test.com",
            "password": "testtest",
            "nickname": "test",
            "over13": True,
        }, format='json')

        # get both of the tokens from the register return
        # (the access token is just called token here)
        self.access = response.data['token']
        self.refresh = response.data['refresh']

    @parameterized.expand(_refresh_info)
    def test_refresh(self, expected_status):
        response = self.client.post(REFRESH_URL, {'refresh': self.refresh}, format='json')
        self.assertEqual(response.status_code, expected_status)
        self.assertNotEqual(self.access, response.data['access'])

    @parameterized.expand(_refresh_info_invalid_token)
    def test_refresh_invalid_token(self, token_input, expected_status, message):
        response = self.client.post(REFRESH_URL, token_input)
        self.assertEqual(response.status_code, expected_status)
        self.assertEqual(response.data, message)

    @parameterized.expand(_refresh_info_validation_error)
    def test_refresh_validation_error(self, token_input, expected_status, errors):
        response = self.client.post(REFRESH_URL, token_input)
        self.assertEqual(response.status_code, expected_status)
        for field, message in errors:
            self.assertEqual(response.data[field][0].__str__(), message)


def _blacklist_info():
    return [
        (
            status.HTTP_200_OK,
            (
                status.HTTP_401_UNAUTHORIZED,
                "Token is invalid or blacklisted.",
            ),
        ),
    ]


def _blacklist_info_invalid():
    return [
        (
            {"refresh_token": "5"},
            status.HTTP_401_UNAUTHORIZED,
            "Token is invalid or blacklisted.",
        ),
    ]


class TestBlacklistView(APITestCase):
    def setUp(self):
        response = self.client.post(REGISTER_URL, {
            "email": "test@test.com",
            "password": "testtest",
            "nickname": "test",
            "over13": True,
        }, format='json')

        # get both of the tokens from the register return
        # (the access token is just called token here)
        self.access = response.data['token']
        self.refresh = response.data['refresh']

    @parameterized.expand(_blacklist_info)
    def test_blacklist(self, first_status, second_status):
        response = self.client.post(BLACKLIST_URL, {
            'refresh_token': self.refresh,
        }, format='json')
        self.assertEqual(response.status_code, first_status)

        # try to blacklist token again
        response = self.client.post(BLACKLIST_URL, {'refresh_token': self.refresh}, format='json')
        self.assertEqual(response.status_code, second_status[0])
        self.assertEqual(response.data, second_status[1])

    @parameterized.expand(_blacklist_info_invalid)
    def test_blacklist_invalid(self, token, expected_status, message):
        response = self.client.post(BLACKLIST_URL, token)
        self.assertEqual(response.status_code, expected_status)
        self.assertEqual(response.data, message)


def _login_info():
    return [
        ({
            'email': 'test@test.com',
            'password': 'testtest',
        }, status.HTTP_200_OK),
        ({
            'email': 'test@test.com',
            'password': 't',
        }, status.HTTP_400_BAD_REQUEST,
            [
                'No active account found with the given credentials',
            ],
        ),
        ({
            'email': 'test',
            'password': 'testtest',
        }, status.HTTP_400_BAD_REQUEST,
            [
                'No active account found with the given credentials',
            ],
        ),
    ]


def _login_info_validation_errors():
    return [
        ({},
            status.HTTP_400_BAD_REQUEST,
            [
                ('email', 'This field is required.'),
                ('password', 'This field is required.'),
        ]),
    ]


class TestLoginView(APITestCase):
    def setUp(self):
        self.client.post(REGISTER_URL, {
            'email': 'test@test.com',
            'nickname': 'test',
            'password': 'testtest',
            'over13': True,
        }, format='json')

    @parameterized.expand(_login_info)
    def test_login(self, user_data, expected_status, errors=None):
        response = self.client.post(LOGIN_URL, user_data)
        self.assertEqual(response.status_code, expected_status)
        if errors:
            for message in errors:
                self.assertEqual(response.data, message)

    @parameterized.expand(_login_info_validation_errors)
    def test_login_validation_errors(self, user_data, expected_status, errors):
        response = self.client.post(LOGIN_URL, user_data)
        self.assertEqual(response.status_code, expected_status)
        for field, message in errors:
            self.assertEqual(response.data[field][0].__str__(), message)
