from django.test import TestCase, Client
from rest_framework import status
from macbeth_backend.models.account.user import User
import datetime


class LoginViewSetTest(TestCase):
    '''Login ViewSet Tests for the :class: `LoginViewSet`.

    :param: TestCase: The base class for test cases.
    :type: TestCase: class
    '''
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@123.com",
            password='123456',
            **{'nickname': 'Test',
               'over13': True, },
        )
        self.client = Client()

    def test_api_login_valid(self):
        response = self.client.post(
            '/api/auth/login/', 
            {'email': self.user.email, 'password': '123456'},
        )

        data = response.data['user']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data['email'], self.user.email)
        self.assertEqual(data['nickname'], self.user.nickname)
        self.assertEqual(data['over13'], self.user.over13)
        self.assertEqual(data['is_active'], self.user.is_active)
        self.assertEqual(data['is_staff'], self.user.is_staff)
        self.assertEqual(data['is_superuser'], self.user.is_superuser)
        return

    def test_api_login_invalid(self):
        invalid_pass = self.client.post(
            '/api/auth/login/', 
            {'email': self.user.email, 'password': '1234567'},
        )
        invalid_email = self.client.post(
            '/api/auth/login/',
            {'email': '2142124323', 'password': '123456'},
        )

        self.assertEqual(invalid_pass.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(invalid_email.status_code, status.HTTP_401_UNAUTHORIZED)
        return


class RegisterViewSetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='taken@test.com',
            password='12345678',
            **{'nickname': 'Taken',
               'over13': True, },
        )
        self.client = Client()
        return

    def test_api_register_valid(self):
        response = self.client.post(
            '/api/auth/register/', {
                'email': 'test@test.com',
                'password': '12345678',
                'nickname': 'test',
                'over13': True,
            },
        )
        
        data = response.data['user']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(data['is_active'], False)
        self.assertEqual(data['is_staff'], False)
        self.assertEqual(data['is_superuser'], False)

        query = User.objects.get(email="test@test.com")
        self.assertEqual(query.email, 'test@test.com')
        self.assertEqual(query.nickname, 'test')
        self.assertEqual(query.over13, True)
        return

    def test_api_register_invalid_email(self):
        response = self.client.post(
            '/api/auth/register/', {
                'email': 'test',
                'password': '12345678',
                'nickname': 'test',
                'over13': True,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0], 'Enter a valid email address.')
        self.assertEqual(User.objects.filter(email='test').count(), 0)
        return

    def test_api_register_invalid_password(self):
        response = self.client.post(
            '/api/auth/register/', {
                'email': 'tester@test.com',
                'password': '1234',
                'nickname': 'test',
                'over13': True,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.filter(email='tester@test.com').count(), 0)
        return


class BlacklistTokenViewSetTest(TestCase):
    '''BlacklistToken ViewSet Tests for the :class: `BlacklistTokenViewSet`.

    :param: TestCase: The base class for test cases.
    :type: TestCase: class
    '''
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@123.com",
            password='12345678',
            **{'nickname': 'Test',
               'over13': True, },
        )
        self.client = Client()

    def test_api_logout_valid(self):
        login_response = self.client.post(
            '/api/auth/login/',
            {'email': self.user.email, 'password': '12345678'}
        )
        logout_response = self.client.post(
            '/api/auth/logout/', 
            {'refresh_token': login_response.data['refresh']},
        )
        response = self.client.post(
            '/api/auth/refresh',
            {'refresh_token': login_response.data['refresh']},
        )

        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.status_code, status.HTTP_301_MOVED_PERMANENTLY)
        return