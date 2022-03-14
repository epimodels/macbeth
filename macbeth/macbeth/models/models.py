from django.db import models

class Test_Model(models.Model):
    id = models.IntegerField(primary_key=True, default=None)
    title = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.title}"


class Parameter(models.Model):
    name = models.CharField(max_length=30)
    value = models.IntegerField()
    model_id = models.ForeignKey(Test_Model, on_delete=models.CASCADE)