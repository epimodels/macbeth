#! /usr/bin/env python3
# -*- coding: utf8 -*-
# ------------------------------------------------------------
# file: lv_predator_prey_with_runge_kutta_result.py
# ------------------------------------------------------------
# 4th order Lotka Volterra Result
# https://github.dev/artificial-life-lab/population-dynamics/blob/master/causal_inference/config.py

from dataclasses import dataclass


@dataclass
class LVPredatorPreyWithRungeKuttaResult:

    time: list
    prey_population: list
    predators_population: list
