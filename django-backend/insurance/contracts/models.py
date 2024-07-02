from django.db import models


class Customer(models.Model):
    GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
   ] 
    customer_id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=30) 
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=50, null=False)
    id_card_number = models.CharField(max_length=20, unique=True)
    passport_number = models.CharField(max_length=20, unique=True)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(max_length=254,null=True, blank=True, unique=True)
    
    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    
    
class Contract(models.Model):    
    INSURANCE_TYPE_CHOICES = [
        ('Health', 'Health Insurance'),
        ('Life', 'Life Insurance'),
        ('Auto', 'Auto Insurance'),
        ('Home', 'Home Insurance'),
    ]
    
    contract_number = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    insurance_type = models.CharField(max_length=15, choices=INSURANCE_TYPE_CHOICES)    
    insurance_holder = models.CharField(max_length=30)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
     
    
    def __str__(self):
        return f"{self.contract_number} {self.insurance_type}"
   