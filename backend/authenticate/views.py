from django.shortcuts import render
import json
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserAccount
from base64 import b64encode
import mimetypes
from rest_framework import status
from rest_framework.views import APIView
from .models import UserAccount
from .serializers import UserCreateSerializer

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

class PostView(APIView):
    def get(self, request, *args, **kwargs):
        posts = UserAccount.objects.all()
        serializer = UserCreateSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = UserCreateSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


