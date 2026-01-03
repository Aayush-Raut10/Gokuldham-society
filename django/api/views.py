from  api.models import memberDb, contactForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def members_api(request):
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
       
        print(cleaned_data["name"])
        name = cleaned_data["name"]
       
        # if name:

        #     member = memberDb.objects.create(full_name=name)
        #     members = {
        #         "id": task.id,
        #         "task": task.task
        #         }
            
        #     return JsonResponse(members, )

        # return JsonResponse(10, safe=False)
    
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

        

        

