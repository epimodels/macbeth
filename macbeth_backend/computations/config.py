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

    @staticmethod
    def load_config_from_obj(obj):
        path = os.path.dirname(inspect.getfile(obj))
        config_path = os.path.join(path, CONFIG_FILENAME)
        with open(config_path, 'r') as f:
            config = json.load(f)
        return config

    @staticmethod
    def title(obj):
        config = Config.load_config_from_obj(obj)
        if 'Title' in config:
            return config['Title']
        return None

    @staticmethod
    def description(obj):
        config = Config.load_config_from_obj(obj)
        if 'Description' in config:
            return config['Description']
        return None

    @staticmethod
    def version(obj):
        config = Config.load_config_from_obj(obj)
        if 'Version' in config:
            return config['Version']
        return None
