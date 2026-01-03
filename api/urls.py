from django.urls import path

urlpatterns = [
    
    path('member', views.memberList, name="member-list")
]