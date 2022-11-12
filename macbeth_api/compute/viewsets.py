#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: viewsets.py
# ------------------------------------------------------------
# Compute Model ViewSets

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_dataclasses.serializers import DataclassSerializer
from macbeth_backend import COMPUTE_MODELS, ComputeModel
from macbeth_backend.computations.config import Config
from macbeth_core.logging import log

MODEL_LIST = []
for compute_model in COMPUTE_MODELS:
    MODEL_LIST += [
        {
            'title': Config.title(compute_model.model),
            'version': Config.version(compute_model.model),
            'id': compute_model.name,
        },
    ]

MODEL_TO_CONF_DICT = {}
for model in COMPUTE_MODELS:
    MODEL_TO_CONF_DICT[model.name] = model


class ComputeModelsViewSet(viewsets.ViewSet):
    '''ViewSet for handling of compute models.'''

    permission_classes = (AllowAny, )
    http_method_names = ['get']

    def list(self, request):
        '''List all available compute models.'''
        log.info(f'Called with request: {request}')
        return Response({'models': MODEL_LIST}, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        '''Retrieve a specific compute model.'''
        # pk = hopefully the id of the model we want.
        log.info(f'Called with request: {request}, pk: {pk}')
        try:
            log.info('Retrieving configuration ')
            body = Config.load_config_from_obj(MODEL_TO_CONF_DICT[pk].model)
            return Response(body, status=status.HTTP_200_OK)

        except KeyError:
            log.exception(f'Model not found with id: {pk}', exc_info=True)
            return Response({
                'error': 'Model not found.',
            }, status=status.HTTP_404_NOT_FOUND)

        finally:
            log.info('Finished')

    @action(detail=True, methods=['GET'], name='Perform a computation')
    def perform_computation(self, request, pk=None):
        log.info(f'Called with request: {request}, pk: {pk}')
        try:
            log.info('Performing computation')
            model_info: ComputeModel = MODEL_TO_CONF_DICT[pk]
            kwargs = Config.generate_kwargs_for_obj(model_info.model, request.query_params)
            computed_result = Config.sanitize_dataclass(model_info.model(**kwargs).compute_model())
            serializer = DataclassSerializer(instance=computed_result, dataclass=type(computed_result))
            return Response(serializer.data, status=status.HTTP_200_OK)

        except KeyError:
            log.exception(f'Model not found with id: {pk}', exc_info=True)
            return Response({
                'error': 'Model not found.',
            }, status=status.HTTP_404_NOT_FOUND)
        except ValidationError:
            log.exception(f'Invalid request body: {request.data}', exc_info=True)
            return Response({
                'error': 'Invalid request body.',
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            log.exception(f'Unknown error computing model: {pk}', exc_info=True)
            return Response({
                'error': 'Unknown error computing model.',
            }, status=status.HTTP_400_BAD_REQUEST)
        finally:
            log.info('Finished')
