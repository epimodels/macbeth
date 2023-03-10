#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: zombie_seir.py
# ------------------------------------------------------------
# zombie seir compute model

import numpy
from scipy import integrate
from macbeth_backend.computations.interface_compute_model import InterfaceComputeModel
from macbeth_backend.computations.zombie_seir.zombie_seir_result import ZombieSEIRResult


class ZombieSEIR(InterfaceComputeModel):

    def __init__(self, infect_prob, infect_duration, latent_period):
        self.infect_prob = infect_prob
        self.infect_duration = infect_duration
        self.latent_period = latent_period

    def compute_model(self, **kwargs):
        s0 = 0.9999
        e0 = 0.
        i0 = 0.0001
        r0 = 0.
        initial_pop = (s0, e0, i0, r0)
        beta = self.infect_prob
        gamma = self.infect_duration
        alpha = self.latent_period
        t_end = 125.
        t_start = 1.
        t_step = 0.1
        numpy.arange(t_start, t_end, t_step)

        # Solving the differential equation. Solves over t for initial conditions
        # PopIn
        def seir_system(_, initial_pop):
            # Creating an array of equations
            seir_equations = numpy.zeros((4))
            seir_equations[0] = -beta * (initial_pop[0] * initial_pop[2])
            seir_equations[1] = (beta * (initial_pop[0] * initial_pop[2]) - alpha * initial_pop[1])
            seir_equations[2] = alpha * initial_pop[1] - gamma * initial_pop[2]
            seir_equations[3] = gamma * initial_pop[2]
            return seir_equations

        scipy_integrate_ode = integrate.ode(seir_system)

        # BDF method suited to stiff systems of ODEs
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

        t = numpy.vstack(time_series).flatten()
        s, e, i, r = numpy.column_stack(outcome_series)
        return ZombieSEIRResult(t, s, e, i, r)


if __name__ == '__main__':
    zombie_seir = ZombieSEIR(0.1, 0.1, 0.1)
    print(zombie_seir.compute_model())
