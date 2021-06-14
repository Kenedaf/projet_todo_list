from django.urls import path, include
from . import views
from django.views.generic import TemplateView, ListView  
from django.conf.urls import  url, include
from django.views.generic import ListView
from todo.models import Todo_list, Categorie

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token



urlpatterns = [
    path('user/user_get/<str:email>', views.user_get_username),
    path('api-token-auth/', views.CustomAuthToken.as_view()),
    path('api-token-register/', views.create1),
   
    path('categorie/<str:query>', views.categorie_list),
    path('categorie/detail/<int:pk>', views.categorie_detail),

    path('todo_list', views.todo_list_list),
    path('todo_list/<int:pk>', views.todo_list_detail),
    path('todo_list/put_with_cat/<int:pk>/<int:categorie_id>', views.todo_list_put_with_categorie),
    path('todo_list/post_with_cat/<int:categorie_id>', views.todo_list_post_with_categorie)

  
]