from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

@api_view(['POST, GET'])
def createTimeLine(request, *args, **kwargs):
    body = request.body
    data = json.loads(body)
    name = data['name']
    description = data['description']
    public = data['public']
    
