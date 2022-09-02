from numpy import require
from macbeth_backend.models.epimodels import EpiModel
from macbeth_backend.models.account import User
from django.db import models
from django.utils import timezone
from .job_manager import JobManager


class Job(models.Model):
    '''
    Model for the Job table
    '''
    id = models.AutoField(primary_key=True)
    model_id = models.IntegerField(default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateTimeField(default=timezone.now)
    status = models.IntegerField(default=0)
    input_params = models.JSONField()
    results = models.CharField(max_length=10000, default=None)
    # results = models.JSONField() # this is the goal, but we have to figure out JSON serialization
    objects = JobManager()

    REQUIRED_FIELDS = ['model_id', 'created_by', 'input_params', ]

    def __str__(self):
        '''Returns the unique identifier of the :class: `Job`
        
        :return: the unique identifer
        :rtype: str
        '''
        return f"{self.id}"
    
    def get_status(self):
        '''Returns the status of the :class: `Job`
        
        :return: the status
        :rtype: int
        '''
        return self.status
