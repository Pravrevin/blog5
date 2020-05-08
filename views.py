from django.shortcuts import render,redirect
import yaml
import os
import os.path
import requests
from django.http import HttpResponse

# Create your views here.
from django.template import RequestContext
from django.views.decorators.csrf import ensure_csrf_cookie

path=""

def Home(request):
    return render(request, 'BlogApp/Home.html')

def Dashboard(request):
    return render(request, 'BlogApp/Dashboard.html')


def workflowStepDetail(request):
    if request.method=="GET":
        blogData = request.GET.get('blogData')
        print("Blog Data : ", blogData)
    return HttpResponse('')

def get(request):
    context = RequestContext(request)
    context_dict = {}
    # Update the dictionary with csrf_token
    context_dict.update(csrf(request))
    return render_to_response("your_template.html", context_dict, context)