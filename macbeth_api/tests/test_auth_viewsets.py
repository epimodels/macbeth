from django.test import TestCase, Client
from rest_framework import status
from macbeth_backend.models.account.user import User


class LoginViewSetTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@123.com", 
            password='123456', 
            **{'date_of_birth': '1986-08-12'}
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
        self.assertEqual(data['firstname'], self.user.firstname)
        self.assertEqual(data['lastname'], self.user.lastname)
        self.assertEqual(data['date_of_birth'], self.user.date_of_birth)
        self.assertEqual(data['is_active'], self.user.is_active)
        self.assertEqual(data['is_staff'], self.user.is_staff)
        self.assertEqual(data['is_superuser'], self.user.is_superuser)
        return

    def test_api_login_invalid(self):
        invalid_pass= self.client.post(
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
            **{'date_of_birth': '1986-08-12'},
        )
        self.client = Client()
        return

    def test_api_register_valid(self):
        response = self.client.post(
            '/api/auth/register/', {
                'email': 'test@test.com', 
                'password': '12345678', 
                'firstname': 'test', 
                'lastname': 'test', 
                'date_of_birth': '1986-08-12',
            },
        )
        
        data = response.data['user']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(data['is_active'], False)
        self.assertEqual(data['is_staff'], False)
        self.assertEqual(data['is_superuser'], False)
        return

    def test_api_register_invalid_email(self):
        response = self.client.post(
            '/api/auth/register/', {
                'email': 'test', 
                'password': '12345678',
                'firstname': 'test',
                'lastname': 'test',
                'date_of_birth': '1986-08-12',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0], 'Enter a valid email address.')
        return