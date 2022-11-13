#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: ebola_model.py
# ------------------------------------------------------------
# ebola compute model. Default parameters are for Liberia.
# https://arxiv.org/pdf/1409.4607.pdf

from pathlib import Path
from macbeth_backend.computations.ebola_model.ebola_model_result import EbolaModelResult
from macbeth_backend.computations.interface_compute_model import InterfaceComputeModel
from stochpy import SSA
import numpy


class EbolaModel(InterfaceComputeModel):

    def __init__(self, start_time, end_time, n_runs,
                 beta_i, beta_h, beta_f,
                 alpha, gamma_i, gamma_h, gamma_f,
                 gamma_d, gamma_dh, gamma_ih,
                 dx, delta_1, delta_2):

        # General simulation parameters
        self.start_time = start_time
        self.end_time = end_time
        self.n_runs = n_runs

        self.beta_i = beta_i
        self.beta_h = beta_h
        self.beta_f = beta_f

        self.alpha = 1 / alpha
        self.gamma_i = 1 / gamma_i
        self.gamma_h = 1 / gamma_h
        self.gamma_f = 1 / gamma_f
        self.gamma_d = 1 / gamma_d
        self.gamma_dh = 1 / gamma_dh
        self.gamma_ih = 1 / gamma_ih
        self.dx = dx
        self.delta_1 = delta_1
        self.delta_2 = delta_2

        self.ebola = SSA()
        self.ebola.Model(model_file='ebola_model.psc', dir=Path(__file__).parent.absolute())
        self.ebola.ChangeParameter('beta_i', self.beta_i)
        self.ebola.ChangeParameter('beta_h', self.beta_h)
        self.ebola.ChangeParameter('beta_f', self.beta_f)
        self.ebola.ChangeParameter('alpha', self.alpha)
        self.ebola.ChangeParameter('gamma_i', self.gamma_i)
        self.ebola.ChangeParameter('gamma_h', self.gamma_h)
        self.ebola.ChangeParameter('gamma_f', self.gamma_f)
        self.ebola.ChangeParameter('gamma_d', self.gamma_d)
        self.ebola.ChangeParameter('gamma_dh', self.gamma_dh)
        self.ebola.ChangeParameter('gamma_ih', self.gamma_ih)
        self.ebola.ChangeParameter('dx', self.dx)
        self.ebola.ChangeParameter('delta_1', self.delta_1)
        self.ebola.ChangeParameter('delta_2', self.delta_2)
        return

    def compute_model(self):

        time = list(range(self.start_time, self.end_time))
        infected = numpy.empty(self.end_time)
        hospitalized = numpy.empty(self.end_time)
        total_size = numpy.empty(self.n_runs)

        for i in range(self.n_runs):
            self.ebola.Endtime(self.end_time)
            self.ebola.DoStochSim()
            self.ebola.GetRegularGrid(n_samples=self.end_time)
            population = self.ebola.data_stochsim_grid.species
            for t in range(self.end_time - self.start_time):
                infected[t] = (i * infected[t] + population[5][0][t]) / (i + 1)
                hospitalized[t] = (i * hospitalized[t] + population[6][0][t]) / (i + 1)
            total_size[i] = (i * total_size[i] + population[2][0][-1]+population[3][0][-1]+population[3][0][-1]) \
                / (i + 1)

        return EbolaModelResult(time, infected, hospitalized, total_size)
