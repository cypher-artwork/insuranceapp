from django.urls import path
from contracts.api.views import ContractListCreateAPIView, ContractDetailAPIView, ContractTypesViewSet, CustomerGenderViewSet
from contracts.api.views import CustomerCreateAPIView, CustomerDetailAPIView

urlpatterns = [
    path("customers/", CustomerCreateAPIView.as_view(), name="customer-list"),
    path("customers/<int:pk>/", CustomerDetailAPIView.as_view(), name="customer-detail"),
    path("customers/<int:pk>/contract/", ContractListCreateAPIView.as_view(), name="customer-contract"),
    path("contracts/", ContractListCreateAPIView.as_view(), name="contract-list"),
    path("contracts/<int:pk>/", ContractDetailAPIView.as_view(), name="contract-details"),
    path("contract-types/", ContractTypesViewSet.as_view(), name="contract-types"),
    path("customer-genders/", CustomerGenderViewSet.as_view(), name="customer-genders"),
]
