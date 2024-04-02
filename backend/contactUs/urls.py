from django.urls import path
from . import views

urlpatterns = [
    path('sendEmail/', views.sendEmail)
]