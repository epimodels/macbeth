#! /usr/bin/env python3
# -*- coding: utf8 -*-
# ------------------------------------------------------------
# File: test_ebola_model.py
# ------------------------------------------------------------
# Tests EbolaModel Model

from dataclasses import fields
from unittest import TestCase
from macbeth_backend.computations.ebola_model.ebola_model import EbolaModel
from macbeth_backend.computations.ebola_model.ebola_model_result import EbolaModelResult
from parameterized import parameterized


def _ebola_inputs():
    yield (0, 100, 20, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6)


class EbolaModelTest(TestCase):

    @parameterized.expand(_ebola_inputs)
    def test_returns_dataclass_object(self, start_time, end_time, n_runs,
                                      beta_i, beta_h, beta_f, alpha,
                                      gamma_i, gamma_h, gamma_f, gamma_d,
                                      gamma_dh, gamma_ih, dx, delta_1, delta_2):

        compute = EbolaModel(start_time=start_time, end_time=end_time, n_runs=n_runs,
                             beta_i=beta_i, beta_h=beta_h, beta_f=beta_f,
                             alpha=alpha, gamma_i=gamma_i, gamma_h=gamma_h,
                             gamma_f=gamma_f, gamma_d=gamma_d, gamma_dh=gamma_dh,
                             gamma_ih=gamma_ih, dx=dx, delta_1=delta_1,
                             delta_2=delta_2)
        result = compute.compute_model()
        self.assertIsInstance(result, EbolaModelResult)

    @parameterized.expand(_ebola_inputs)
    def test_dataclass_object_has_no_null_fields(self, start_time, end_time, n_runs,
                                                 beta_i, beta_h, beta_f,
                                                 alpha, gamma_i, gamma_h, gamma_f,
                                                 gamma_d, gamma_dh, gamma_ih, dx,
                                                 delta_1, delta_2):

        compute = EbolaModel(start_time=start_time, end_time=end_time, n_runs=n_runs,
                             beta_i=beta_i, beta_h=beta_h, beta_f=beta_f,
                             alpha=alpha, gamma_i=gamma_i, gamma_h=gamma_h,
                             gamma_f=gamma_f, gamma_d=gamma_d, gamma_dh=gamma_dh,
                             gamma_ih=gamma_ih, dx=dx, delta_1=delta_1,
                             delta_2=delta_2)
        result = compute.compute_model()
        for field in fields(result):
            self.assertIsNotNone(getattr(result, field.name))
