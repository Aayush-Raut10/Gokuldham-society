from django.urls import path
from . import views

urlpatterns = [
    
    path('member', views.members_api, name="member-api"),
    path('contact', views.contact_api, name="contact-api")
]