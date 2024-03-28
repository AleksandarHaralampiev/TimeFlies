from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views



urlpatterns = [
    path('create/', views.createTimeLine),
    #path('list/', views.getTimeLine),
    path('public/', views.getAllPublicTimeLine),
    path('addUserToServer/', views.addUser),
    path('changeRole/', views.changeRole),
    path('checkUser/', views.checkUser),
    path('list/', views.GetMyTimelines),
    path('changes/', views.timelineChanges),
    path('deleteTimeline/', views.deleteTimeline)
]

