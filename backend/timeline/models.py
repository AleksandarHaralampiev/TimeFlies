from django.db import models
import sys

from server.models import Server

class Timeline(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_modifired = models.DateTimeField(auto_now=True)

    
    class Meta:
        db_table = "timelines"
    def __str__(self):
        return self.title
    