#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: config.py
# ------------------------------------------------------------
# Loads the config file for a given object

import os
import json
import inspect

CONFIG_FILENAME = 'config.json'


class Config:
    '''Config class to retreive the config file for a given object.
    '''

    @staticmethod
    def load_config_from_obj(obj):
        '''Loads the entire config file for a given object.
        '''
        path = os.path.dirname(inspect.getfile(obj))
        config_path = os.path.join(path, CONFIG_FILENAME)
        with open(config_path, 'r') as f:
            config = json.load(f)
        return config

    @staticmethod
    def title(obj):
        '''Returns the title of the config file for a given object.
        '''
        config = Config.load_config_from_obj(obj)
        if 'Title' in config:
            return config['Title']
        return None

    @staticmethod
    def description(obj):
        '''Returns the description of the config file for a given object.
        '''
        config = Config.load_config_from_obj(obj)
        if 'Description' in config:
            return config['Description']
        return None

    @staticmethod
    def version(obj):
        '''Returns the version of the config file for a given object.
        '''
        config = Config.load_config_from_obj(obj)
        if 'Version' in config:
            return config['Version']
        return None
