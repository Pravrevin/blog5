from django.shortcuts import render,redirect
import yaml
import os
import os.path

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

        path = "static/" + name

        with open(path+"/workflow.yaml", "w") as yaml_file:
            # with is to automatic close file
            yaml.dump(value, yaml_file, default_flow_style=True)

            # The default_flow_style=False parameter is necessary to produce the format you want (flow style), otherwise for nested collections it produces block style:

        return render(request, 'BlogApp/Home.html', {'msg': "Value inserted Successful"})
    else:
        return render(request, 'BlogApp/Home.html', {'msg': "Value not inserted"})


def workflowStepDetail(request):
    if request.method=="POST":
        stepName=request.POST['stepName']
        foldername = request.POST['foldername']
        stepType = request.POST['stepType']
        OperationVariable = request.POST.getlist('OperationVariable[]')
        Select_reader = request.POST.getlist('Select_reader[]')
        selectProcessor = request.POST.getlist('selectProcessor[]')
        selectWriter = request.POST.getlist('selectWriter[]')
        value={stepName : {'Step Type':stepType, 'Operation Variable':OperationVariable, 'Reader':Select_reader, 'Processor':selectProcessor, 'Writer':selectWriter}}

        # define the name of the directory to be created
        path = "static/" + foldername
        # define the access rights
        isdir = os.path.isdir(path)
        if isdir==False:
            os.mkdir(path)
            with open(path + "/" + stepName + ".yaml", "w") as yaml_file:
                yaml.dump(value, yaml_file, default_flow_style=True)

                # The default_flow_style=False parameter is necessary to produce the format you want (flow style), otherwise for nested collections it produces block style:

        else:
            # As an optional parameter you can specify the access rights to the directory within your mkdir() call. The default setting is 777, which means it is readable and writable by the owner, group members, and all other users as well. In case you require a more restrictive setting, like 755, (readable and accessible by all users, and write access by only the owner) you may call it as follows:
            # access_rights = 0o755

            with open(path + "/" + stepName + ".yaml", "w") as yaml_file:
                yaml.dump(value, yaml_file, default_flow_style=True)

                # The default_flow_style=False parameter is necessary to produce the format you want (flow style), otherwise for nested collections it produces block style:

        return render(request, 'BlogApp/Home.html', {'name_return' : foldername})

    else:
        return render(request, 'BlogApp/Home.html', {'msg': "Value not inserted"})

def add(request, a=0):

    return render(request, 'BlogApp/Home.html',{'a':a+1})

