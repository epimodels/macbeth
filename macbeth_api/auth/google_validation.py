import requests
from rest_framework.exceptions import ValidationError
from django.conf import settings
from macbeth_core.logging import log

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'


def google_validate_token_id(*, token_id):

    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        params={'id_token': token_id},
    )
    if response.status_code != 200:
        raise ValidationError('Invalid token id')

    audience = response.json()['aud']
    if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
        raise ValidationError('Invalid token id')
    
    return response.json()

