# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import AbstractUser

from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
User = settings.AUTH_USER_MODEL


#User = settings.AUTH_USER_MODEL
class User(AbstractUser):
    pass
# Ce code est déclenché chaque fois qu'un nouvel utilisateur a été créé et enregistré dans la base de données
# @receiver lie un signal a une fonction 


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
#_________________________________________________________________________________
# Create your models here.
#_________________________________________________________________________________

class Categorie(models.Model):
    #, unique=True
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    nom_categorie= models.CharField(max_length= 100, null=False)
    checked=models.BooleanField(null=True) 
    class Meta:
        verbose_name="categorie"
    def __str__(self):
        return self.nom_categorie
        

class Todo_list(models.Model):
    titre= models.CharField(max_length=100, null=True)
    a_faire=models.CharField(max_length=900, null=True)
    categorie= models.ForeignKey(Categorie, related_name='todo_lists',on_delete=models.CASCADE, null=True) 
   
    class Meta:
        verbose_name="Todo_list"
        
    
    def __str__(self):
        return self.titre

        
