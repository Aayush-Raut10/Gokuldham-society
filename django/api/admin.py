from django.contrib import admin
from api.models import memberDb, UserDb, NoticesDb

# Register your models here.
admin.site.register(memberDb)
admin.site.register(UserDb)
admin.site.register(NoticesDb)
