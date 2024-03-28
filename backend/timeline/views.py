from django.shortcuts import render
from . import models
from server.models import Server
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Timeline


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
        
@api_view(['POST'])
def addEvent(request):
    #title, description, creater_id, timeline_id
    title = request.data.get('title')
    description = request.data.get('description')
    timeline_id = request.data.get('timeline_id')

    try:
        timeline = Server.objects.get(id = timeline_id)
        print(timeline_id)
    except:
        return Response("There was an error with getting the object!")
    try:
        Timeline.objects.create(server = timeline, title = title, description = description)
        return Response("The creation is a succses!")
    except:
        return Response("There was an error with the creation!")

        
               

