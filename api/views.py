from  api.models import memberDb
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
        title = data["title"]
       
        if title:

            task = TaskDb.objects.create(task=title)
            tasklist = {
                "id": task.id,
                "task": task.task
                }
            print(type(tasklist))
            return JsonResponse(tasklist)

        return JsonResponse(10, safe=False)
    
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

        

