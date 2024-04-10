from django.db import models
import sys
from server.models import Server

def server_icon_upload_path(instance, filename):
    return f"eventPhoto/{instance.event.id}/event_picture/{filename}"

class Timeline(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_modifired = models.DateTimeField(auto_now=False)
    
    class Meta:
        db_table = "timelines"
    def __str__(self):
        return self.title
    
class Photo(models.Model):
    event = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to = server_icon_upload_path, default=None, null=True)