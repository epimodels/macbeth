#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: __init__.py
# ------------------------------------------------------------
# Locates all of the compute models and loads them into the
# compute_models dictionary.

import pkgutil

__all__ = []
for loader, module_name, is_pkg in pkgutil.walk_packages(path=__path__):
    __all__.append(module_name)
    _module = loader.find_module(module_name).load_module(module_name)
    globals()[module_name] = _module
