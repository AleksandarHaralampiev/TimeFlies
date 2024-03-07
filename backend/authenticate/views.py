from django.shortcuts import render
import json
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
        return Response(data={"message": "The account doesn't exist"}, status=404)
    if check_password(password, user.password):
        return Response(data = {"message": str(user.id)}, status=200)
    else:
        return Response(data = {"message": "The passwords doesnt match"}, status=404)