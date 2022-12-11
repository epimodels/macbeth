#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: serializers.py
# ------------------------------------------------------------
# Login and Register Serializers

from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(required=False, default='')
    last_name = serializers.CharField(required=False, default='')
