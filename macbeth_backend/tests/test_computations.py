#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_computations.py
# ------------------------------------------------------------
# Tests the compute models are working as expected and
# reflection is able to find the compute models.

import unittest
from parameterized import parameterized

import macbeth_backend as mb
from macbeth_backend.computations.config import Config


def _compute_models():
    '''_summary_computation_test_cases() returns a list of tuples
    containing:
        [0] - Name of Model
        [1] - List of attributes
    '''
    return [
        (
            'ZombieSEIR',
            ('infect_prob', 'infect_duration', 'latent_period'),
        ),
        (
            'ZombieSIR',
            ('infect_prob', 'infect_duration'),
        ),
    ]


class TestComputeModels(unittest.TestCase):
    '''Test cases for the compute models.

    :param unittest: The unittest module.
    :type unittest: module
    '''

    def test_compute_models_are_loaded(self):
        '''Tests that the compute models are correctly loaded into the
        COMPUTE_MODELS dictionary located in the macbeth_backend.
        '''
        models_under_test = _compute_models()
        models_found = mb.COMPUTE_MODELS
        assert len(models_under_test) <= len(models_found)

    @parameterized.expand(_compute_models)
    def test_compute_models_have_attributes(self, name, attributes):
        '''Tests that the compute models have the correct attributes.
        '''
        for model in mb.COMPUTE_MODELS:
            if model.name == name:
                model_under_test = model
                break

        for attribute in attributes:
            assert attribute in model_under_test.attributes

    @parameterized.expand(_compute_models)
    def test_compute_models_have_correct_name(self, name, _):
        '''Tests that the compute models have the correct name.
        '''
        for model in mb.COMPUTE_MODELS:
            if model.name == name:
                model_under_test = model
                break

        assert model_under_test.name == name

    def test_load_config_file(self):
        '''Tests that the compute models have the correct name.
        '''
        for model in mb.COMPUTE_MODELS:
            assert Config.load_config_from_obj(model.model) is not None

    def test_title_config_file(self):
        '''Tests that the config files for the compute models have the correct
        title.
        '''
        for model in mb.COMPUTE_MODELS:
            assert Config.title(model.model) is not None

    def test_description_config_file(self):
        '''Tests that the config files for the compute models have the correct
        description.
        '''
        for model in mb.COMPUTE_MODELS:
            assert Config.description(model.model) is not None

    def test_version_config_file(self):
        '''Tests that the config files for the compute models have the correct
        version.
        '''
        for model in mb.COMPUTE_MODELS:
            assert Config.version(model.model) is not None
