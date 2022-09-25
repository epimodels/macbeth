#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_compute.py
# ------------------------------------------------------------
# Tests Compute ViewSet


from django.test import TestCase
from rest_framework.test import APIRequestFactory
from macbeth_api.compute.viewsets import ComputeModelsViewSet
from parameterized import parameterized


def _model_ids():
    yield ('ZombieSIR', 1, 'ZombieSIR')
    yield ('ZombieSEIR', 1, 'ZombieSEIR')


def _valid_parameter_config_keys():
    yield 'Name'
    yield 'VariableName'
    yield 'Type'
    yield 'Description'
    yield 'Min'
    yield 'Max'
    yield 'DefaultValue'


def _valid_compute_query_strings():
    yield ('ZombieSEIR', {'infect_prob': 0.5, 'infect_duration': 5, 'latent_period': 2})
    yield ('ZombieSIR', {'infect_prob': 0.5, 'infect_duration': 5})


class ComputeViewSetTest(TestCase):

    compute_api = '/api/compute/'
    factory = APIRequestFactory()
    compute_view_set = ComputeModelsViewSet

    def setUp(self):
        self.request = self.factory.get(self.compute_api)

    @parameterized.expand(_model_ids)
    def test_list_contains_model_ids(self, title, version, id):
        response = self.compute_view_set.as_view({'get': 'list'})(self.request)
        models = response.data.get('models')
        self.assertTrue(any(model.get('title') == title and
                            model.get('version') == version and
                            model.get('id') == id for model in models))

    @parameterized.expand(_model_ids)
    def test_retrieve_returns_valid_config_for_id(self, _title, _version, id):
        response = self.compute_view_set.as_view({'get': 'retrieve'})(self.request, pk=id)
        self.assertContains(response, 'Title')
        self.assertContains(response, 'Version')
        self.assertContains(response, 'Author')
        self.assertContains(response, 'Description')
        self.assertContains(response, 'Type')
        self.assertContains(response, 'Authorlink')
        self.assertContains(response, 'Parameters')
        self.assertContains(response, 'GraphingData')

    @parameterized.expand(_model_ids)
    def test_retrieve_returns_value_parameters(self, _title, _version, id):
        response = self.compute_view_set.as_view({'get': 'retrieve'})(self.request, pk=id)
        parameters = response.data.get('Parameters')
        for parameter in parameters:
            for key in _valid_parameter_config_keys():
                self.assertIn(key, parameter)

    @parameterized.expand(_model_ids)
    def test_retrieve_returns_graphing_data(self, _title, _version, id):
        response = self.compute_view_set.as_view({'get': 'retrieve'})(self.request, pk=id)
        graphing_data = response.data.get('GraphingData')
        self.assertIn('X', graphing_data, msg='GraphingData must contain X')
        self.assertIn('Y', graphing_data, msg='GraphingData must contain Y')

    @parameterized.expand(_valid_compute_query_strings)
    def test_compute_returns_valid_response(self, id, parameters):
        request = self.factory.get(self.compute_api, parameters)
        response = self.compute_view_set.as_view({'get': 'perform_computation'})(request, pk=id)
        self.assertEqual(response.status_code, 200)
