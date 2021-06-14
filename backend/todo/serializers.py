from django.contrib.auth.models import AbstractUser
from rest_framework import serializers
from django.conf import settings

from todo.models import Todo_list,Categorie, User
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=6, write_only=True, required=True)

    class Meta:
        model = User
        fields = (
             'username', 'password', 'email'
            )

    def create(self, validated_data):
       return User.objects.create_user(**validated_data)
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
           setattr(instance, attr, value)
           instance.save()
        return instance
 




class Todo_listSerializer(serializers.ModelSerializer):    
    class Meta:
        model= Todo_list
        fields='__all__'
        depth= 3

class CategorieSerializer(serializers.ModelSerializer):
    todo_lists= Todo_listSerializer(read_only=True, many=True)
    class Meta:
        model =Categorie
        fields= '__all__'
        depth =3

class CategorieSerializeradd (serializers.ModelSerializer):
    todo_lists= Todo_listSerializer(write_only=True, many=True) 
    class Meta:
        model= Categorie
        fields ='__all__'
        depth = 5
