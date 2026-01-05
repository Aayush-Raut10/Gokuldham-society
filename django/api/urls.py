from django.urls import path
from . import views

urlpatterns = [
    
    path('members', views.member_list_create, name="member-list-create"),
    path('members/<int:id>', views.member_detail, name="member-detail-update-delete"),
    path('contacts', views.contact_api, name="contact-api"),
    path('users', views.user_register, name="user-register-api"),
    
]