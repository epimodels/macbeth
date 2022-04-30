
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class ComputeModelsViewSet(viewsets.ViewSet):
    '''ViewSet for handling of compute models.'''

    permission_classes = (AllowAny, )
    http_method_names = ['get']

    def list(self, request):
        '''List all available compute models.'''
        return Response({
            'models':
            [
                {"name": "Example Model 1", "id": "examplemodel1"},
                {"name": "Example Model 2", "id": "examplemodel2"},
                {"name": "Example Model 3", "id": "examplemodel3"},
            ]
        }, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        '''Retrieve a specific compute model.'''
        return Response({
                        "Title": "Example Model",
                        "Version": "1.0",
                        "Author": "Example Author",
                        "Description": "This is an example model that demonstrates how the different functionality works for configuring epidemic models",
                        "Type": "Deterministic",
                        "Authorlink": "https://www.idmod.org/",
                        "Parameters":
                        [
                            {
                                "Name": "Integer Example",
                                "Type": "integer",
                                "Description": "A brief explanation of what the parameter controls.",
                                "Min": 0,
                                "Max": 10000,
                                "DefaultValue": 100,
                            },
                            {
                                "Name": "Double Example",
                                "Type": "double",
                                "Description": "A brief explanation of what the parameter controls.",
                                "Min": -1.0,
                                "Max": 1,
                                "DefaultValue": 0.1
                            },
                            {
                                "Name": "String Example",
                                "Type": "string",
                                "Description": "A brief explanation of what the parameter controls. Strings might be used for seeds.",
                                "Min": {},
                                "Max": {},
                                "DefaultValue": "",
                            },
                        ],
                        },
                        status=status.HTTP_200_OK)
