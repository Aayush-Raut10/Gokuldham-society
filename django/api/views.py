from  api.models import memberDb, contactForm, UserDb
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import sqlite3
from api.models import UserDb
from django.core.mail import send_mail
from backend import settings
import random 
import string

@csrf_exempt
def member_list_create(request):
    """
    GET -> list all members
    POST -> create new member
    """

    if request.method == "GET":
    
        members = memberDb.objects.all().values()

        print(type(members))

        members = list(members)
        print(members)
        return JsonResponse(members, safe=False)
    

    elif request.method == "POST":

        raw_data = request.body
        print(type(raw_data))
        print(raw_data)

        cleaned_data = json.loads(raw_data)
       
        # print(cleaned_data.get("fullname"))
        # print(cleaned_data.get("flatid"))

        fullname = cleaned_data.get("fullname")
        flatid = cleaned_data.get("flatid")
        phone = cleaned_data.get("phone")
        age = cleaned_data.get("age")
        email = cleaned_data.get("email")

       
        if fullname and flatid and phone and age and email:

            member = memberDb.objects.create(full_name=fullname, flat_id = flatid, phone=phone, age=age, email=email)

            chars = string.ascii_letters + string.digits
            password = ''.join(random.choices(chars, k=6))

            newUser = UserDb.objects.create(username=member.email, password=password)

            print(password)

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
            "flatid":member.flat_id,
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
        member.flat_id = data.get("flatid",member.flat_id)
        member.phone = data.get("contact",member.phone)
        member.age = data.get("age",member.age)
        member.email = data.get("email", member.email)

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

    # Use a context manager for automatic closing 
    with sqlite3.connect("example.db") as conn:
        cursor = conn.cursor()
        
       
        # Fetching data
        cursor.execute("SELECT * FROM users")
        print(cursor.fetchall())

    



