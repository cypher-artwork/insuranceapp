from rest_framework import generics, mixins, views, permissions
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from contracts.models import Customer, Contract
from contracts.api.serializers import ContractSerializer, CustomerSerializer


class CustomerCreateAPIView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = (permissions.AllowAny,)
    
    
class CustomerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = (permissions.AllowAny,)

    
class ContractListCreateAPIView(generics.ListCreateAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = (permissions.AllowAny,)

      
class ContractDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = (permissions.AllowAny,)
    

class ContractTypesViewSet(views.APIView):
    permissions_classes = (permissions.AllowAny,)
    
    def get(self, request, *args, **kwargs):
        types = [choice[0] for choice in Contract.INSURANCE_TYPE_CHOICES]
        return Response(types)

class CustomerGenderViewSet(views.APIView):
    permissions_classes = (permissions.AllowAny,)
    
    def get(self, request, *args, **kwargs):
        genders = [choice[0] for choice in Customer.GENDER_CHOICES]
        return Response(genders)

    
