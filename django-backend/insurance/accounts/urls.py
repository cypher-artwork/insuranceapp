from django.urls import path
from accounts import views


urlpatterns = [
    path('api/auth/', views.CustomAuthToken.as_view()),
]