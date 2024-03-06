from django.db import models
from ..server.models import Server

class Timeline(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_modifired = models.DateTimeField(auto_now=True)
    points = models.ManyToManyField('Point', related_name='timelines')
    
    class Meta:
        db_table = "timelines"
        ordering = ["-date"]
    def __str__(self):
        return self.title
    