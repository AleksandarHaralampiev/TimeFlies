from django.db import models
import datetime
from PIL import Image
from authenticate.models import UserAccount

class Server(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    editors = models.ManyToManyField(UserAccount, related_name='editors')
    members = models.ManyToManyField(UserAccount, related_name='members')
    public = models.BooleanField(default = 0, null = 0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.owner}"



# class Timeline(models.Model):
#     id = models.AutoField(primary_key=True)
#     title = models.CharField(max_length=255)
#     description = models.TextField(null=True, blank=True)
#     start_date = models.DateTimeField()
#     end_date = models.DateTimeField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     server = models.ForeignKey(Server, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.title} - {self.server}"

# class Event(models.Model):
#     id = models.AutoField(primary_key=True)
#     title = models.CharField(max_length=255)
#     description = models.TextField(null=True, blank=True)
#     start_date = models.DateTimeField()
#     end_date = models.DateTimeField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.title} - {self.timeline}"