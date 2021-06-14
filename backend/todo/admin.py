# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin
from .models import Categorie, Todo_list, User

admin.site.register(User, UserAdmin)
admin.site.register(Todo_list)
admin.site.register(Categorie)
