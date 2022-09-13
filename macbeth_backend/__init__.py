#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: __init__.py
# ------------------------------------------------------------
# Locates all of the compute models and loads them into the
# compute_models dictionary.

from dataclasses import dataclass
import inspect

from macbeth_backend.computations.interface_compute_model import InterfaceComputeModel


@dataclass
class ComputeModel:

    name: str
    attributes: list
    model: InterfaceComputeModel

    def __init__(self, name, attributes, model):
        self.name = name
        self.attributes = attributes
        self.model = model


def _load_compute_models(parent=InterfaceComputeModel):
    models = set()
    for child in parent.__subclasses__():
        models.add(child)
        models.update(_load_compute_models(child))
    return models


def _get_attributes_model(model):
    # `self` is the first argument of every method.
    attributes = inspect.getfullargspec(model.__init__).args[1:]
    return ComputeModel(model.__name__, attributes, model)


_models_classes = _load_compute_models()
COMPUTE_MODELS = [_get_attributes_model(model) for model in _models_classes]
