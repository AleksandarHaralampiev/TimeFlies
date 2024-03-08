from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Server
from authenticate.models import UserAccount
import json

@api_view(['POST', 'GET'])
def createTimeLine(request, *args, **kwargs):
    body = request.body
    data = json.loads(body)
    name = data['name']
    description = data['description']
    public = int(data['public'])
    owner_id = int(data['owner_id'])
    owner = UserAccount.objects.filter(id=owner_id).first()
  
    server = Server(name = name, description = description, owner = owner, public = public)
    server.save()

    return Response(data = {"message": "Successfully created"}, status=200)


