
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from macbeth_backend import COMPUTE_MODELS
from macbeth_backend.computations.config import Config

import json

# [{ Title, Version, id }, ...]
# list() = GET "API/Compute/"

# retrieve = GET "API/Compute/ID"

# create = POST "API/Compute/"
MODEL_LIST = []
for model in COMPUTE_MODELS:
    MODEL_LIST += [
        {
            'title': Config.title(model['model']),
            'version': Config.version(model['model']),
            'id': model['name'],
        }
    ]

MODEL_TO_CONF_DICT = {}
for model in COMPUTE_MODELS:
    MODEL_TO_CONF_DICT[model['name']] = model

class ComputeModelsViewSet(viewsets.ViewSet):
    '''ViewSet for handling of compute models.'''

    permission_classes = (AllowAny, )
    http_method_names = ['get']

    def list(self, request):
        '''List all available compute models.'''
        return Response({
            'models': MODEL_LIST,
        }, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        '''Retrieve a specific compute model.'''
        # The identifier is the name of the model class
        # pk = hopefully the id of the model we want.
        # Make COMPUTE_MODELS a dictionary of {name: model}
        # if pk in dict, return the config file for it, otherwise error
        print(f'pk: {pk}')
        body = ""
        try:
            body = Config.load_config_from_obj(
                MODEL_TO_CONF_DICT[pk]['model'],
            )
        except KeyError:
            return Response({
                'error': 'Model not found.',
            }, status=status.HTTP_404_NOT_FOUND)

        return Response(
            body,
            status=status.HTTP_200_OK,
        )
