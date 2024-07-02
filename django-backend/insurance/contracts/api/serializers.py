from rest_framework import serializers
from rest_framework import validators
from contracts.models import Customer, Contract

from rest_framework import serializers


class ContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contract
        exclude = ("updated_at",) 

    
class CustomerSerializer(serializers.ModelSerializer):
    
    contracts = ContractSerializer(many=True, read_only=True)   
    
    class Meta:
        model = Customer
        fields = "__all__"
    
   

   
    










