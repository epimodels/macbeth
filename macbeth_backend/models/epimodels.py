from unittest import case
from django.db import models
from django.contrib.postgres.fields import ArrayField


class EpiModel(models.Model):
    id = models.IntegerField(primary_key=True, default=None)
    title = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.title}"


class Parameter(models.Model):
    name = models.CharField(max_length=30)
    value = models.IntegerField()
    model_id = models.ForeignKey(EpiModel, on_delete=models.CASCADE)


class SIRResults(models.Model):
    model_id = models.ForeignKey(EpiModel, on_delete=models.CASCADE)
    result = ArrayField(models.FloatField(), size = 1241)
    # also need job id, user id, time stamp
    # job id key = (job id, user id, time stamp)
