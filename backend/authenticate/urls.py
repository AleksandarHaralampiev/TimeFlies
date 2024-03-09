from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
from .views import PostView



urlpatterns = [
    path('valid/', views.isUser),
    path('info/', views.getUserCredentials),
    path('api/posts/', PostView.as_view(), name='posts'),
]

