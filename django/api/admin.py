from django.contrib import admin
from api.models import memberDb, UserDb, NoticesDb, FlatData


# Register your models here.
admin.site.register(memberDb)
admin.site.register(UserDb)
admin.site.register(NoticesDb)
admin.site.register(FlatData)
