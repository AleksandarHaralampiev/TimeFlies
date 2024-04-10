from django.shortcuts import render
from . import models
from server.models import Server
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Timeline, Photo
from django.db import IntegrityError
from django.utils.dateparse import parse_datetime
from rest_framework import status
from datetime import datetime
from django.utils.timezone import make_aware

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
    title = request.data.get('title')
    description = request.data.get('description')
    timeline_id = request.data.get('timeline_id')
    date_str = request.data.get('date')
    photoList = request.FILES.getlist('images')

    try:
        timeline = Server.objects.get(id=timeline_id)
    except Server.DoesNotExist:
        return Response("Timeline does not exist", status=status.HTTP_404_NOT_FOUND)

    try:
        date = datetime.strptime(date_str, "%d.%m.%Y")
        date_aware = make_aware(date)
        
        event = Timeline.objects.create(server=timeline, title=title, description=description, date_modifired=date_aware)

        for photo in photoList:
            try:
                Photo.objects.create(event=event, photo=photo)
            except Exception as e:
                return Response(f"Error creating photo: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response("Creation successful")
    except ValueError as e:
        return Response(f"Invalid input: {e}", status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError as e:
        return Response(f"Integrity error: {e}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response(f"An error occurred: {e}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

               

