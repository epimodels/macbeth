from django.shortcuts import render, redirect
from .models import EpiModel, Parameter
from .computations.computemodels import ZombieSIR


# Create your views here.
def index(request):
    return render(request, 'backend/index.html')


def showModelList(request):
    results = EpiModel.objects.all()
    if request.method == 'POST':
        choice = request.POST.get('chosen_model_id')
        return redirect(f'compute/{str(choice)}')
    return render(request, 'backend/compute.html', {'showModelList': results})


def results(request, d, model_id):
    print(f'd - {d}')
    if model_id == 101:
        for key in d.keys():
            d[key] += 1
        return render(request, 'backend/results.html', {'input_plus_one': d})
    elif model_id == 102:
        for key in d.keys():
            d[key] += 2
        return render(request, 'backend/results.html', {'input_plus_one': d})
    else:
        return redirect('compute/')


def chosen_model_form(request, model_id=101):
    print(f'render parameter input form for model with id : {model_id}')
    params = Parameter.objects.filter(model_id=model_id)
    if request.method == 'POST':
        d = {}
        for i in range(0, len(params)):
            d.update({params[i].name: int(request.POST.get(params[i].name))})
        return results(request, d, model_id)
    return render(request, 'backend/chosen_model.html', {"parameters": params})

