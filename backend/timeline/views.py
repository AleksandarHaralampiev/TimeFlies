from django.shortcuts import render
from . import models
from server.models import Server
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getEvents(request, *args, **kwargs):
    if request.method == "GET":
        id = int(request.GET.get('id'))
        server = Server.objects.filter(id = id).first()
        if server:
   
            timelines = models.Timeline.objects.filter(server_id = id).all()
            data = [{
                'title': timeline.title,
                'description': timeline.description,
                'date_modified': timeline.date_modifired
            } for timeline in timelines]
            print(data)
            return Response(data = data, status=200)
        
               

