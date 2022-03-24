from django.shortcuts import render, redirect
from macbeth.models.models import EpiModel, Parameter

def index(request):
    return render(request, 'templates/index.html')

def showModelList(request):
    results = EpiModel.objects.all()
    if request.method == 'POST':
        choice = request.POST.get('chosen_model_id')
        return redirect(f'compute/{str(choice)}')
    return render(request, 'compute.html', {'showModelList': results})

def results(request, d, model_id):
    print(f'd - {d}')
    if model_id == 101:
        for key in d.keys():
            d[key] += 1
        return render(request, 'results.html', {'input_plus_one': d})
    elif model_id == 102:
        for key in d.keys():
            d[key] += 2
        return render(request, 'results.html', {'input_plus_one': d})
    else:
        return redirect('compute/')


def chosen_model_form(request, model_id=101):
    choice = EpiModel.objects.get(id=model_id)
    print(f'render parameter input form for model with id : {model_id}')
    params = Parameter.objects.filter(model_id=model_id)
    if request.method == 'POST':
        d = {}
        for i in range(0, len(params)):
            d.update({params[i].name: int(request.POST.get(params[i].name))})
        return redirect(f'{model_id}/results', d, model_id)
    return render(request, 'chosen_model.html', {"parameters": params})
