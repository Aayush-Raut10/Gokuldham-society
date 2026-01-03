from django.urls import path
from . import views

urlpatterns = [
    
    path('member', views.members_api, name="member-list")
]