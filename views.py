from django.shortcuts import render,redirect
import yaml
import os
import os.path
from django.http import HttpResponse
from django.http import JsonResponse


# Create your views here.
path=""

def Home(request):
    return render(request, 'BlogApp/Home.html')

def Dashboard(request):
    return render(request, 'BlogApp/Dashboard.html')

def workflow(request):
    """
    This
    :param request:
    :return:
    """
    if request.method=="POST":
        name=request.POST['name']
        description = request.POST['description']
        step = request.POST.getlist('step[]')
        value={name : {'Description':description, 'Steps':step}}

        print(name,description,step)


    return HttpResponse('output')

            # The default_flow_style=False parameter is necessary to produce the format you want (flow style), otherwise for nested collections it produces block style:


def workflowStepDetail(request):
    if request.method=="POST":
        stepName=request.POST['stepName']
        stepType = request.POST['stepType']
        OperationVariable = request.POST.getlist('OperationVariable[]')
        Select_reader = request.POST.getlist('Select_reader[]')
        selectProcessor = request.POST.getlist('selectProcessor[]')
        selectWriter = request.POST.getlist('selectWriter[]')
        value={stepName : {'Step Type':stepType, 'Operation Variable':OperationVariable, 'Reader':Select_reader, 'Processor':selectProcessor, 'Writer':selectWriter}}

        print(stepName,stepType)
    return HttpResponse('Output2')


def workflowData(request):

    if request.method == 'GET':
        post_id = request.GET.get('blogdata')
        print('data is =',post_id)

        data = request.GET.get('post_id')
        print('cszczc',data)
        return JsonResponse(post_id,safe= False)



