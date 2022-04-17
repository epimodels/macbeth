#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: __init__.py
# ------------------------------------------------------------
# Locates all of the compute models and loads them into the
# compute_models dictionary.

import inspect
from compututations import *


def _load_compute_models(parent=interface_compute_model.InterfaceComputeModel):
    models = set()
    for child in parent.__subclasses__():
        models.add(child)
        models.update(_load_compute_models(child))
    return models


def _get_attributes_model(model):
    attributes = inspect.getfullargspec(model.__init__).args
    return {
        'title': model.title(),
        'description': model.description(),
        'attributes': [a for a in attributes if not (a[0].startswith('_') or a == 'self')],
        'model': model,
    }


_models_classes = _load_compute_models()
COMPUTE_MODELS = {model.title(): _get_attributes_model(model) for model in _models_classes}

del _models_classes
del _load_compute_models
del _get_attributes_model
