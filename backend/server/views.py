from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Server
from authenticate.models import UserAccount
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ServerSerializer
import json

@api_view(['POST', 'GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
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




@api_view(['GET'])
def getTimeLine(request, *args, **kwargs):
    if request.method == "GET":
        try:
            body = request.body
            data = json.loads(body)
            id = int(data['id'])
            servers = Server.objects.filter(owner = id).all()
            servers_data = [{"id": server.id, "name": server.name, "description": server.description} for server in servers]
            return Response(data = {"servers": servers_data}, status=200)
        except:
            return Response(data={"error": "Invalid request"}, status=400)
