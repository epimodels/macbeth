#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: zombie_sir.py
# ------------------------------------------------------------
# Zombie SIR Compute Model

import numpy
from scipy import integrate
from .interface_compute_model import InterfaceComputeModel


class ZombieSIR(InterfaceComputeModel):

    def __init__(self, infect_prob, infect_duration):
        self.infect_prob = infect_prob
        self.infect_duration = infect_duration
        super().__init__()

    @staticmethod
    def title():
        return 'Zombie SIR'

    @staticmethod
    def description():
        return 'The Zombie SIR model is a simple model of a zombie epidemic.'

    def compute_model(self, **kwargs):

        # Parameter Values and Initial Conditions
        s0 = 0.9999
        i0 = 0.0001
        r0 = 0.
        initial_pop = (s0, i0, r0)
        beta = self.infect_prob
        gamma = self.infect_duration
        t_end = 125.
        t_start = 1.
        t_step = 0.1
        numpy.arange(t_start, t_end, t_step)

        def sir_system(t, intial_population):
            sir_equations = numpy.zeros((3))
            sir_equations[0] = -beta * (intial_population[0] * intial_population[1])
            sir_equations[1] = (beta * (intial_population[0] * intial_population[1]) - gamma * intial_population[1])
            sir_equations[2] = gamma * intial_population[1]
            return sir_equations

        scipy_integrate_ode = integrate.ode(sir_system)

        scipy_integrate_ode.set_integrator('vode', nsteps=500, method='bdf')
        scipy_integrate_ode.set_initial_value(initial_pop, t_start)

        time_series = []
        outcome_series = []

        count = 0
        while scipy_integrate_ode.successful() and scipy_integrate_ode.t < t_end:
            count += 1
            scipy_integrate_ode.integrate(scipy_integrate_ode.t + t_step)
            time_series.append(scipy_integrate_ode.t)
            outcome_series.append(scipy_integrate_ode.y)

        if count == 1:  # Something is wrong
            return False

        t = numpy.vstack(time_series)
        s, i, r = numpy.column_stack(outcome_series)
        return t, s, i, r


if __name__ == '__main__':
    zombie_sir = ZombieSIR(0.1, 0.1)
    print(zombie_sir.compute_model())
