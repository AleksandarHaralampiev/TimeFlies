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
from django.db.models import Q
from timeline.models import Timeline

#get_response_or404
from django.shortcuts import get_object_or_404
import json
from base64 import b64encode
import mimetypes

def getPhoto(id):
    user = UserAccount.objects.filter(id = id).first()
    content_type, _ = mimetypes.guess_type(user.profile_picture.name)
    with user.profile_picture.open('rb') as image_file:
        encoded_string = b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:{content_type};base64,{encoded_string}"
        return data_uri
    
def getEditorPhotos(server_id):
    server = get_object_or_404(Server, id = server_id)
    editors = server.editors.all()
    editor_list = []
    for editor in editors:
        user = get_object_or_404(UserAccount, email = editor)
        editor_list.append(getPhoto(user.id))   

    return editor_list

def getContributors(server_id):
    contributors = []

    # Fetch server and related users in a single query
    server = Server.objects.select_related('owner').prefetch_related('editors', 'members').get(id=server_id)
    owner = server.owner

    # Owner
    owner_dict = {
        'username': owner.username,
        'profile_picture': getPhoto(owner.id),
        'id': owner.id,
        'role': 3
    }
    contributors.append(owner_dict)

    # Editors
    for editor in server.editors.all():
        editor_dict = {
            'username': editor.username,
            'profile_picture': getPhoto(editor.id),
            'id': editor.id,
            'role': 2
        }
        contributors.append(editor_dict)

    # Members
    for member in server.members.all():
        member_dict = {
            'username': member.username,
            'profile_picture': getPhoto(member.id),
            'id': member.id,
            'role': 1
        }
        contributors.append(member_dict)

    return contributors


@api_view(['POST', 'GET'])
def createTimeLine(request, *args, **kwargs):
    body = request.body
    data = json.loads(body)
    name = data['name']
    description = data['description']
    public = int(data['public'])
    owner_id = int(data['owner_id'])
    owner = UserAccount.objects.filter(id=owner_id).first()
  
    server = Server(name = name, description = description, owner = owner, owner_id = owner_id, public = public)
    server.save()

    return Response(data = {"message": "Successfully created"}, status=200)




#@api_view(['GET'])
#def getTimeLine(request, *args, **kwargs):
#    if request.method == "GET":
#        
#        id = int(request.GET.get('id'))
#        servers = Server.objects.filter(owner = id).all()
#        
#        servers_data = [{
#            "id": server.id,
#            "name": server.name, 
#            "description": server.description,
#            "public": server.public,
#            "owner_username": UserAccount.objects.filter(id = server.owner_id).first().username,
#            "date": str(server.created_at).split(' ')[0],
#            "owner_photo": getPhoto(server.owner_id)
#            } 
#            for server in servers]
#        return Response(data = {"servers": servers_data}, status=200)
    
          


@api_view(['GET'])
def getAllPublicTimeLine(request, *args, **kwargs):
    if request.method == "GET":
       
            publicServers = Server.objects.filter(public = 1).all()
            
            servers_data = [{
                "id": server.id,
                "name": server.name, 
                "description": server.description,
                "public": server.public,
                "contributors": getContributors(server.id),
                "owner_username": UserAccount.objects.filter(id = server.owner_id).first().username,
                "date": str(server.created_at).split(' ')[0],
                "owner_id": server.owner_id
                } 
                  for server in publicServers]
            return Response(data = {"servers": servers_data}, status=200)
       
        
        
@api_view(['POST', ])
def addUser(request, *args, **kwargs):
    if request.method == "POST":
        body = request.body
        data = json.loads(body)
        email = data['email']
        server_id = int(data['server_id'])
        role = int(data['role'])

        user  = get_object_or_404(UserAccount, email = email)
        if user:
           server = get_object_or_404(Server, id = server_id)
           if role == 1:
               server.members.add(user)
               server.save()
           elif role == 2:
               server.editors.add(user)
               server.save()
        return Response(data = {"message": "Successfully added"}, status=200)
       # 
        
@api_view(['POST'])
def changeRole(request, *args, **kwargs):
    if request.method == "POST":
        body = request.body
        data = json.loads(body)
        user_id_role = data['user_id_role']
        server_id = int(data['server_id'])
        new_role = int(data['new_role'])

        user  = get_object_or_404(UserAccount, id = user_id_role)
        if user:
            server = get_object_or_404(Server, id = server_id)
            if new_role == 0:
                server.members.remove(user)
                server.editors.remove(user)
                return Response(data = {"message": "The user is now not neither member or editor"}, status=200)
            if new_role == 1:
                server.members.add(user)
                server.editors.remove(user)
                return Response(data = {"message": "The user is now member"}, status=200)
            if new_role == 2:
                server.members.remove(user)
                server.editors.add(user)
                return Response(data = {"message": "The user is now editor"}, status=200)
        else:
            return Response(status=404)
    
@api_view(['GET'])
def checkUser(request, *args, **kwargs):
    if request.method == "GET":
        body = request.body
        data = json.loads(body)
        user_id = int(data['id']) 
        server_id = int(data['server_id'])
        user = get_object_or_404(UserAccount, id = user_id)
        server = get_object_or_404(Server, id = server_id)
        is_member = server.members.filter(id=user_id).exists()
        is_editor = server.editors.filter(id=user_id).exists()
        
        if is_member:
            return Response(data={"message": "The user is member"}, status=200)
        elif is_editor:
            return Response(data={"message": "The user is editor"}, status=200)
        else:
            return Response(data={"message": "The user is default"}, status=200)

@api_view(['GET'])
def GetMyTimelines(request):
    id_value = request.GET.get('id')
    user = get_object_or_404(UserAccount, id=id_value)
    
    servers = Server.objects.filter(Q(owner=user) | Q(editors=user) | Q(members=user)).distinct()

    servers_data = []
    for server in servers:
        server_data = {
            "id": server.id,
            "name": server.name, 
            "description": server.description,
            "public": server.public,
            "contributors": getContributors(server.id), 
            "owner_username": UserAccount.objects.filter(id=server.owner_id).first().username,
            "date": str(server.created_at).split(' ')[0],
            "owner_id": server.owner_id
        }
        servers_data.append(server_data)

    return JsonResponse({'servers_data': servers_data})
        
@api_view(['POST'])
def timelineChanges(request):
    name = request.data.get('name')
    description = request.data.get('description')
    server_id = request.data.get('server_id')
    
    try:
        server = Server.objects.get(id = server_id)
    except:
        return Response("The is wasn't found!", status=500)
    
    if server.name != name or server.description != description:
        server.name = name 
        server.description = description
        server.save()
        return Response("The changes are applyed!")
    
@api_view(['POST'])
def deleteTimeline(request):
    timeline_id = request.data.get('timeline_id')
    
    try:
        timeline = Server.objects.get(id = timeline_id)
    except:
        return Response("There is an error with the object!", status=500)

    try:
        timeline.delete()
        return Response("Delete succses!")
    except:
        return Response("The delete is incorrect!", status=500)

# @api_view(['GET'])
# def getEditorId(request, *args, **kwargs):
#     if request.method == "GET":
#         try:
#             id = int(request.GET.get('id'))
#             server = Server.objects.filter(id = id).first()       
#             editors = server.editors.all()
#             editors_data = [{"id": editor.id, "username": editor.username, "email": editor.email} for editor in editors]
#             return Response(data = {"editors": editors_data}, status=200)
#         except:
#             return Response(data={"error": "Invalid request"}, status=400)