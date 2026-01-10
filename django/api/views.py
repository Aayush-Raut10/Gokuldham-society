from  api.models import memberDb, contactForm, UserDb, NoticesDb, FlatData
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import sqlite3
from api.models import UserDb
from django.core.mail import send_mail
from backend import settings
import random 
import string
import datetime
from django.core.files.storage import FileSystemStorage
import os


@csrf_exempt
def member_list_create(request):
    """
    GET -> list all members
    POST -> create new member
    """

    if request.method == "GET":
    
        members = memberDb.objects.all().values()
        members = list(members)

        return JsonResponse(members, safe=False)
    

    elif request.method == "POST":

        raw_data = request.body
        cleaned_data = json.loads(raw_data)

        fullname = cleaned_data.get("fullname")
        flatid = str(cleaned_data.get("flatid"))
        phone = cleaned_data.get("phone")
        age = cleaned_data.get("age")
        email = cleaned_data.get("email")

        try:
            flat = FlatData.objects.get(flat_id=flatid)
        except FlatData.DoesNotExist:
            return JsonResponse({'error':'Flat does not exist'}, status=400)
        
        if memberDb.objects.filter(flat_id=flat).exists():
            return JsonResponse({'error':'Flat already assigned'},status = 400)

       
        if fullname and flatid and phone and age and email:

            member = memberDb.objects.create(full_name=fullname, flat_id = flat, phone=phone, age=age, email=email)

            chars = string.ascii_letters + string.digits
            password = ''.join(random.choices(chars, k=6))

            newUser = UserDb.objects.create(username=member.email, password=password)

            send_mail(
                subject="Welcome to Gokuldhan society",
                message=f"Your are now member of Gokuldham society\nYour username: {member.email}\nPassword:{password}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[member.email],
                fail_silently=False
            )


            response = {
                'status':'success',
                'message':'member details saved successfully',
                'email_status':'sent',
            }

            return JsonResponse(response, safe=False)
        
        else:
            error = {
                'status':'Incomplete',
                'message':'fullname , flatid, contact and age is necessary'
            }
            return JsonResponse(error, status=400)
        
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    

# get member by id, update and delete specific member
@csrf_exempt
def member_detail(request, id):
    """
    GET : Get details os single member by id
    PUT : Update the member detail by id
    DELETE : Delete the member detail by id

    """
   
    # Get the signle member details by id
    if request.method == "GET":

        try:
            member = memberDb.objects.get(id=id)
        
        except memberDb.DoesNotExist:

            return JsonResponse({'error':'member not exists'}, status = 404)
        
        response = {
            "id":member.id,
            "fullname": member.full_name,
            "flatid":member.flat_id.flat_id,
            "phone": member.phone,
            "age": member.age,
            "email":member.email
        }
        return JsonResponse(response)
    

    # Update the single member details by id
    elif request.method == "PUT":
        try:
            member = memberDb.objects.get(id=id)
    
        except memberDb.DoesNotExist:
            return JsonResponse({'error':'member not exists'}, status = 404)
        
        data = json.loads(request.body)

       

        member.full_name = data.get("fullname",member.full_name)
        member.phone = data.get("contact",member.phone)
        member.age = data.get("age",member.age)
        member.email = data.get("email", member.email)

        new_flatid = str(data.get("flatid"))

        if new_flatid:
            try:
                new_flat = FlatData.objects.get(flat_id=new_flatid)
            except FlatData.DoesNotExist:
                return JsonResponse({'error':'Flat does not exist'}, status=400)
        
        if memberDb.objects.filter(flat_id=new_flat).exists():
            return JsonResponse({'error':'Flat already assigned'},status = 400)

        # Assign the new flat object i.e updating flat id if it is provided
        member.flat_id = new_flat

        member.save()

        return JsonResponse({
                "status":"success",
                "message":"successfully updated",
            })
    
    # Delete the single member details by id
    elif request.method == "DELETE":

            try:
                member = memberDb.objects.get(id=id)
        
            except memberDb.DoesNotExist:

                return JsonResponse({'error':'member not exists'}, status = 404)
            
            member.delete()

            return JsonResponse({
                "status":"success",
                "message":"Deleted successfully",
            })
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def contact_api(request):

    if request.method == "POST":
        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        newContact = contactForm.objects.create(name=name, email=email,message=message)

        print(newContact)
        print(type(newContact))

        response = {
            'status':'success',
            'message':'contacat saved successfully',
            'saved_contact_info':{
                'name':newContact.name,
                'email':newContact.email,
                'message':newContact.message
            },
        }
        
        return JsonResponse(response)

    elif request.method == "GET":

        contacts = list(contactForm.objects.all().values())
        print(type(contacts))

        return JsonResponse(contacts, safe=False)

@csrf_exempt
def user_register(request):
    
    if request.method == "POST":

        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")


        return JsonResponse({
            'status':'success',
        })

    else:
        return JsonResponse({'error':'Method not allowed'})


@csrf_exempt
def notice_api(request):
    if request.method == "GET":

        query = request.GET.get("type")
        
        notices = NoticesDb.objects.filter(type=query).values()
        return JsonResponse(list(notices), safe=False)
    
    elif request.method == "POST":
        
        title = request.POST.get("title")
        description = request.POST.get("description")
        noticetype = request.POST.get("notice_type")
       
        image = request.FILES.get("image")

        if not image:
            return JsonResponse({"error": "Image not provided"}, status=400)
        
        time = str(datetime.datetime.now())
        filename = title.replace(" ", "").lower() + time.replace(" ", "").replace("-", "_").replace(":","_")  + ".png"

        fs = FileSystemStorage(location=settings.MEDIA_ROOT)
        saved_name = fs.save(filename, image)

        
        imgurl = request.build_absolute_uri(settings.MEDIA_URL + saved_name)
        print(imgurl)

        newNotice = NoticesDb.objects.create(title=title, description=description, type=noticetype, image_url = imgurl)
        
        return JsonResponse({
            'status':'success',
            'message':'notice created'
        })
    
    else:
        return JsonResponse({"error":"Method not allowed"})
    

@csrf_exempt
def flat_api(request):
    if request.method == "GET":

        flats = FlatData.objects.all().values()
        return JsonResponse(list(flats), safe=False)
    
    elif request.method == "POST":

        data = json.loads(request.body)

        flatid = str(data.get("flatid"))

        if FlatData.objects.filter(flat_id = flatid).exists():
            return JsonResponse({'error':'Flat already exits'},status = 400)

        else:
            newflat  = FlatData.objects.create(flat_id = flatid)

            return JsonResponse({
                'status':'success',
                'message':'Flat added successfully'
            })

    else:
        return JsonResponse({'error':'Method not allowed'})
    



    



