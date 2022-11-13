#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: job_manager.py
# ------------------------------------------------------------
#

from django.db import models
from macbeth_backend import COMPUTE_MODELS
from macbeth_core.logging import log


class JobManager(models.Manager):

    def create_job(self, **extra_fields):
        """
        Creates a new job.
        :param extra_fields:
        :return:
        """
        #model = COMPUTE_MODELS[extra_fields['model_id']]['model'](**extra_fields['input_params'])
        log.info(extra_fields)
        extra_fields['results'] = ""
        job = self.create(**extra_fields)
        job.save(using=self._db)
        return job

    def get_job(self, job_id):
        """
        Returns a job.
        :param job_id:
        :return:
        """
        return super().get_queryset().get(id=job_id)
