from django.db import models

# Create your models here.

class memberDb(models.Model):
    full_name = models.CharField(max_length=64)
    flat_id = models.IntegerField()
    phone = models.CharField(max_length=10)
    age = models.IntegerField()
    email = models.CharField(max_length=64)
    joined_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return self.full_name

class contactForm(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(max_length=64)
    message = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class UserDb(models.Model):
    username = models.CharField(max_length=64)
    password = models.CharField()

    def __str__(self):
        return self.username
    

class NoticesDb(models.Model):

    class NoticeType(models.TextChoices):
        public = 'PUB', 'public'
        private = 'PRI', 'private'

    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    type = models.CharField(max_length=3, choices = NoticeType.choices, default=NoticeType.private)
    image_url = models.URLField()

    def __str__(self):
        return self.title