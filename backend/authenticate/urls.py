from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
from .views import saveChanges



urlpatterns = [
    path('valid/', views.isUser),
    path('info/', views.getUserCredentials),
    path('save_changes/', saveChanges, name='save_changes'),
]

