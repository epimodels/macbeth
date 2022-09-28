#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: compute_model.py
# ------------------------------------------------------------
# Dataclass to store the model and its parameters

from dataclasses import dataclass
from macbeth_backend.computations.interface_compute_model import InterfaceComputeModel


@dataclass
class ComputeModel:

    name: str
    parameters: list
    model: InterfaceComputeModel
