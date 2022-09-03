#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: serializers.py
# ------------------------------------------------------------
#

from . import Job
from rest_framework import serializers


class JobSerializer(serializers.ModelSerializer):
    '''Serializer for the :class: `jobs.Job`

    :param serializers.ModelSerializer: The base class serializer
    :type serializers.ModelSerializer: class
    '''

    class Meta:
        '''Meta class for the :class: `jobs.JobSerializer`.'''
        model = Job
        fields = (
            'model_id', 'created_by', 'created_on', 'status',
            'input_params', 'results',
        )
        read_only_fields = (
            'model_id', 'created_by', 'created_on',
            'input_params', 'results',
        )
