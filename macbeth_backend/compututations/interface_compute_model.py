#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: interface_compute_model.py
# ------------------------------------------------------------
# Provides a formal interface for all models to inherit.

from abc import ABC, abstractmethod


class InterfaceComputeModel(ABC):
    '''Provides a formal interface for all models to inherit.'''

    @abstractmethod
    def __init__(self, *args, **kwargs):
        '''Initializes the interface.'''

    @staticmethod
    @abstractmethod
    def title():
        '''Returns the title of the model.'''

    @staticmethod
    @abstractmethod
    def description():
        '''Returns the description of the model.'''

    @abstractmethod
    def compute_model(self, **kwargs):
        '''Computes the model.'''
