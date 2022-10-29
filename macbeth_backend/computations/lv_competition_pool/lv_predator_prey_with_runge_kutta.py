#! /usr/bin/env python3
# -*- coding: utf8 -*-
# ------------------------------------------------------------
# file: lv_predator_prey_with_runge_kutta.py
# ------------------------------------------------------------
# 4th order Lotka Volterra
# https://github.dev/artificial-life-lab/population-dynamics/blob/master/causal_inference/config.py


from macbeth_backend.computations.interface_compute_model import InterfaceComputeModel
from macbeth_backend.computations.lv_competition_pool.lv_predator_prey_with_runge_kutta_result \
    import LVPredatorPreyWithRungeKuttaResult


class LVPredatorPreyWithRungeKutta(InterfaceComputeModel):

    def __init__(self, start_time, num_iterations,
                 initial_prey_population, initial_predator_population,
                 alpha=10.0, beta=7.0, gamma=3.0, sigma=5.0, step_size=0.01):
        self.start_time = start_time
        self.num_iterations = num_iterations
        self.prey_population = initial_prey_population
        self.predator_population = initial_predator_population

        self.alpha = alpha
        self.beta = beta
        self.gamma = gamma
        self.sigma = sigma
        self.step_size = step_size

        self.time_stamp = [-1] * self.num_iterations
        self.prey_list = [-1] * self.num_iterations
        self.predator_list = [-1] * self.num_iterations
        return

    def _compute_prey_rate(self, current_prey, current_predators):
        return self.alpha * current_prey - self.beta * current_prey * current_predators

    def _compute_predator_rate(self, current_prey, current_predators):
        return - self.gamma * current_predators + self.sigma * current_prey * current_predators

    def _runge_kutta_update(self, current_prey, current_predators, iteration):

        self.time_stamp[iteration] = iteration

        k1_prey = self.step_size * self._compute_prey_rate(current_prey, current_predators)
        k1_pred = self.step_size * self._compute_predator_rate(current_prey, current_predators)

        k2_prey = self.step_size * self._compute_prey_rate(
            current_prey + 0.5 * k1_prey, current_predators + 0.5 * k1_pred)
        k2_pred = self.step_size * self._compute_predator_rate(
            current_prey + 0.5 * k1_prey, current_predators + 0.5 * k1_pred)

        k3_prey = self.step_size * self._compute_prey_rate(
            current_prey + 0.5 * k2_prey, current_predators + 0.5 * k2_pred)
        k3_pred = self.step_size * self._compute_predator_rate(
            current_prey + 0.5 * k2_prey, current_predators + 0.5 * k2_pred)

        k4_prey = self.step_size * self._compute_prey_rate(
            current_prey + k3_prey, current_predators + k3_pred)
        k4_pred = self.step_size * self._compute_predator_rate(
            current_prey + k3_prey, current_predators + k3_pred)

        new_prey_population = current_prey + 1/6 * (k1_prey + 2 * k2_prey + 2 * k3_prey + k4_prey)
        new_predator_population = current_predators + 1/6 * (k1_pred + 2 * k2_pred + 2 * k3_pred + k4_pred)

        self.prey_list[iteration] = new_prey_population
        self.predator_list[iteration] = new_predator_population

        return new_prey_population, new_predator_population

    def _replace_nans(self, list):
        return [x if x == x else 0 for x in list]

    def compute_model(self):
        current_prey = self.prey_population
        current_predators = self.predator_population
        for iteration in range(self.num_iterations):
            current_prey, current_predators = self._runge_kutta_update(current_prey, current_predators, iteration)
        print(LVPredatorPreyWithRungeKuttaResult(
            time=self.time_stamp,
            prey_population=self.prey_list,
            predators_population=self.predator_list))
        return LVPredatorPreyWithRungeKuttaResult(
            time=self.time_stamp,
            prey_population=self._replace_nans(self.prey_list),
            predators_population=self._replace_nans(self.predator_list))
