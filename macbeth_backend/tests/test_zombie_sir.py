#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_zombie_sir.py
# ------------------------------------------------------------
# Tests ZombieSIR Model

from dataclasses import fields
from unittest import TestCase

from macbeth_backend.computations.zombie_sir.zombie_sir import ZombieSIR
from macbeth_backend.computations.zombie_sir.zombie_sir_result import ZombieSIRResult
from parameterized import parameterized


def _sir_inputs():
    yield (0.6, 3)


class ZombieSIRTest(TestCase):

    @parameterized.expand(_sir_inputs)
    def test_returns_dataclass_object(self, infect_prob, infect_duration):
        compute = ZombieSIR(infect_duration=infect_duration, infect_prob=infect_prob)
        result = compute.compute_model()
        self.assertIsInstance(result, ZombieSIRResult)

    @parameterized.expand(_sir_inputs)
    def test_dataclass_object_has_no_null_fields(self, infect_prob, infect_duration):
        compute = ZombieSIR(infect_duration=infect_duration, infect_prob=infect_prob)
        result = compute.compute_model()
        for field in fields(result):
            self.assertIsNotNone(getattr(result, field.name))
