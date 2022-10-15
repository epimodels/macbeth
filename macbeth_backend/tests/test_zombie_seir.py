#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_zombie_seir.py
# ------------------------------------------------------------
# Tests ZombieSEIR Model

from dataclasses import fields
from unittest import TestCase
from macbeth_backend.computations.zombie_seir.zombie_seir import ZombieSEIR
from macbeth_backend.computations.zombie_seir.zombie_seir_result import ZombieSEIRResult
from parameterized import parameterized


def _seir_inputs():
    yield (0.6, 3, 5)


class ZombieSEIRTest(TestCase):

    @parameterized.expand(_seir_inputs)
    def test_returns_dataclass_object(self, infect_prob, infect_duration, latent_period):
        compute = ZombieSEIR(infect_duration=infect_duration, infect_prob=infect_prob, latent_period=latent_period)
        result = compute.compute_model()
        self.assertIsInstance(result, ZombieSEIRResult)

    @parameterized.expand(_seir_inputs)
    def test_dataclass_object_has_no_null_fields(self, infect_prob, infect_duration, latent_period):
        compute = ZombieSEIR(infect_duration=infect_duration, infect_prob=infect_prob, latent_period=latent_period)
        result = compute.compute_model()
        for field in fields(result):
            self.assertIsNotNone(getattr(result, field.name))
