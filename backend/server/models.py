from django.db import models
import datetime
from PIL import Image


class Server( models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    owner = models.ForeignKey('authenticate.UserAccount', on_delete=models.CASCADE)
    editors = models.ManyToManyField('authenticate.UserAccount', related_name='editors')
    members = models.ManyToManyField('authenticate.UserAccount', related_name='members')
    #icon = models.ImageField(upload_to='icons/', null=True, blank=True)
    public = models.BooleanField(default = 0, null = 0)
    created_at = models.DateTimeField(auto_now_add=True)
    #timeline = models.ManyToManyField('timeline.Timeline', related_name='timelines', blank=True)
    
    
    
    
    def __str__(self):
        return f"{self.name} - {self.owner}"
        