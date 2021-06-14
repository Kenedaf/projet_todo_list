from django.shortcuts import render
from .models import Categorie, Todo_list, User
#from django.contrib.auth.models import User
from todo.serializers import Todo_listSerializer, CategorieSerializer, UserSerializer


from django.db.models import Q
from django.urls import reverse_lazy
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from django.shortcuts import render, get_object_or_404

from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db.models import Prefetch

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# Create your views here.
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if created:
          # user was created
          # set the password here
          user.set_password('123')
          user.save()
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username':user.username

        })
@csrf_exempt
def user_get_username(request, email):
    #User = settings.AUTH_USER_MODEL
    try:
        user= User.objects.get(email=email)
    except User.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
    if request.method == 'GET': 
        user_serializer = UserSerializer(user) 
        return JsonResponse(user_serializer.data) 

@csrf_exempt
def create1( request):
     if request.method == 'POST':
        user = JSONParser().parse(request)
        userSerializer=UserSerializer(data=user)
        if userSerializer.is_valid():
            userSerializer.save()
            return JsonResponse( userSerializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse( userSerializer.errors, status=status.HTTP_400_BAD_REQUEST) 
#_______________________________POSTE_______________________________________
@csrf_exempt
def categorie_list(request,query):
    if request.method == 'GET':
        categories= Categorie.objects.filter(user__username=query).all()
        categorie_serializer= CategorieSerializer(categories, many= True)
        return JsonResponse(categorie_serializer.data, safe=False)
    elif request.method == 'POST':
        categorie_data= JSONParser().parse(request)
        user=get_object_or_404(User,username=query)
        categorie_serializer=CategorieSerializer(data=categorie_data)
        if categorie_serializer.is_valid():
            categorie_serializer.save(user=user)
            return JsonResponse(categorie_serializer.data, safe=False)
        return JsonResponse(categorie_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        Categorie.objects.all().delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def categorie_detail (request, pk ):
    try:
        categorie= Categorie.objects.get(pk = pk)
    except Categorie.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        categorie_serializer= CategorieSerializer(categorie)
        return JsonResponse(categorie_serializer.data)
    elif request.method == 'PUT':
        categorie_data= JSONParser().parse(request)
        categorie_serializer=CategorieSerializer(categorie, data=categorie_data)
        if categorie_serializer.is_valid():
            categorie_serializer.save()
            return JsonResponse(categorie_serializer.data)
        return JsonResponse(categorie_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        categorie.delete()
        categorie_serializer= CategorieSerializer(categorie)
        return JsonResponse(categorie_serializer.data)
    return JsonResponse(status=status.HTTP_204_NO_CONTENT)

#____________________________________SALARIER _________________________________________

@csrf_exempt
def todo_list_list(request):
      if request.method == 'GET':
        todo_list= Todo_list.objects.all()
        todo_list_serializer= Todo_listSerializer(todo_list, many= True)
        return JsonResponse(todo_list_serializer.data, safe=False)
      elif request.method == 'POST':
        todo_list_data= JSONParser().parse(request)
        todo_list_serializer=Todo_listSerializer(data=todo_list_data)
        if todo_list_serializer.is_valid():
            todo_list_serializer.save()
            return JsonResponse(todo_list_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(todo_list_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
      elif request.method=='DELETE':
        Todo_list.objects.all().delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)  
@csrf_exempt
def todo_list_detail (request, pk ):
    try:
        todo_list= Todo_list.objects.get(pk = pk)
    except Todo_list.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        todo_list_serializer=Todo_listSerializer(todo_list)
        return JsonResponse(todo_list_serializer.data)
    elif request.method == 'PUT':
        todo_list_data= JSONParser().parse(request)
        todo_list_serializer=Todo_listSerializer(todo_list, data=todo_list_data)
        if todo_list_serializer.is_valid():
            todo_list_serializer.save()
            return JsonResponse(todo_list_serializer.data)
        return JsonResponse(todo_list_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        todo_list.delete()
        todo_list_serializer=Todo_listSerializer(todo_list)
        return JsonResponse(todo_list_serializer.data)
    return JsonResponse(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def todo_list_put_with_categorie (request, pk, categorie_id ):
    try:
        todo_list= Todo_list.objects.get(pk = pk)
    except Todo_list.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        todo_list_data= JSONParser().parse(request)
        categorie=get_object_or_404(Categorie,pk=categorie_id)
        todo_list_serializer=Todo_listSerializer(todo_list, data=todo_list_data)
        if todo_list_serializer.is_valid():
            todo_list_serializer.save(categorie=categorie)
            return JsonResponse(todo_list_serializer.data)
        return JsonResponse(todo_list_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
def todo_list_post_with_categorie (request, categorie_id ):

    if request.method == 'POST':
        todo_list_data= JSONParser().parse(request)
        categorie=get_object_or_404(Categorie,pk=categorie_id)
        todo_list_serializer=Todo_listSerializer( data=todo_list_data)
        if todo_list_serializer.is_valid():
            todo_list_serializer.save(categorie=categorie)
            return JsonResponse(todo_list_serializer.data)
        return JsonResponse(todo_list_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
