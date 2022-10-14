#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: admin.py
# ------------------------------------------------------------
#

from django.contrib import admin
from .models import User
from .models.jobs import Job
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'tnickname')
    list_filter = ('email', 'nickname', 'is_active', 'is_staff')
    ordering = ('date_joined',)
    list_display = ('id', 'email', 'nickname', 'is_active', 'is_staff', 'is_superuser', 'date_joined')
    fieldsets = (
        (None, {'fields': ('email', 'nickname', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')},
         ),
    )


admin.site.register(User, UserAdminConfig)
admin.site.register(Job)
