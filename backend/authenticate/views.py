from django.shortcuts import render
import json
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserAccount
from base64 import b64encode
import mimetypes
from .models import UserAccount
from django.http import JsonResponse
from .models import UserAccount
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import UserAccount

@api_view(['POST', 'GET'])
def isUser(request, *args, **kwargs):
    body = request.body
    data = json.loads(body)
    email = data['email']
    password = data['password']
    try:
        user = UserAccount.objects.get(email=email)
    except UserAccount.DoesNotExist:
        return Response(data={"message": "This account doesn't exist."}, status=404)
    if check_password(password, user.password):
        return Response(data = {"id": str(user.id)}, status=200)
    else:
        return Response(data = {"message": "Wrong password."}, status=404)
    
@api_view(['GET'])
def getUserCredentials(request, *args, **kwargs):
    if request.method == "GET":
        id = int(request.GET.get('id'))
        try:
            user = UserAccount.objects.filter(id = id).first()
            user_data = {
                "email": user.email,
                "username": user.username,
                "profile_picture": None  
            }
            if user.profile_picture:
                content_type, _ = mimetypes.guess_type(user.profile_picture.name)
                with user.profile_picture.open('rb') as image_file:
                    encoded_string = b64encode(image_file.read()).decode('utf-8')
                    data_uri = f"data:{content_type};base64,{encoded_string}"
                    user_data["profile_picture"] = data_uri
            return Response(data = {"data": user_data}, status=200)
        except:
            return Response(data = {"Message": "There is no such account"}, status=404)

@api_view(['POST', 'GET'])
def isUser(request, *args, **kwargs):
    body = request.body
    data = json.loads(body)
    email = data['email']
    password = data['password']
    try:
        user = UserAccount.objects.get(email=email)
    except UserAccount.DoesNotExist:
        return Response(data={"message": "This account doesn't exist."}, status=404)
    if check_password(password, user.password):
        return Response(data = {"id": str(user.id)}, status=200)
    else:
        return Response(data = {"message": "Wrong password."}, status=404)
    
@api_view(['GET'])
def getUserCredentials(request, *args, **kwargs):
    if request.method == "GET":
        id = int(request.GET.get('id'))
        try:
            user = UserAccount.objects.filter(id = id).first()
            user_data = {
                "email": user.email,
                "username": user.username,
                "profile_picture": None  
            }
            if user.profile_picture:
                content_type, _ = mimetypes.guess_type(user.profile_picture.name)
                with user.profile_picture.open('rb') as image_file:
                    encoded_string = b64encode(image_file.read()).decode('utf-8')
                    data_uri = f"data:{content_type};base64,{encoded_string}"
                    user_data["profile_picture"] = data_uri
            return Response(data = {"data": user_data}, status=200)
        except:
            return Response(data = {"Message": "There is no such account"}, status=404)

import requests
from django.http import JsonResponse
from django.core.files.base import ContentFile
from .models import UserAccount

from django.core.files.base import ContentFile
from .models import UserAccount
import base64

@api_view(['POST'])
@login_required
def saveChanges(request):
    if request.method == 'POST':
        user = request.user

        new_username = request.data.get('username')
        new_profile_picture_blob = request.data.get('profile_picture_blob')
        
        if new_username:
            user.username = new_username
        
        if new_profile_picture_blob:
            base64_str = new_profile_picture_blob.split(',')[1]
            
            image_data = base64.b64decode(base64_str)
            
            user.profile_picture.save('profile_picture.jpg', ContentFile(image_data))
        
        user.save()
        
        return JsonResponse({'message': 'Changes saved successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

