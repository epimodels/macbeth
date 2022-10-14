#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: apps.py
# ------------------------------------------------------------
#

from django.apps import AppConfig


class MacbethBackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'macbeth_backend'
