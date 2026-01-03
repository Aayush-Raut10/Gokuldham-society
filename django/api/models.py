from django.db import models

# Create your models here.

class memberDb(models.Model):
    full_name = models.CharField(max_length=64)
    flat_id = models.IntegerField()
    contact = models.CharField(max_length=10)
    age = models.IntegerField()
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
