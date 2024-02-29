# -*- coding: utf-8 -*-
"""
File: serializers
Description: 
Author: mikeshinoda
Date: 2024/2/29
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here
from rest_framework import serializers
from django.contrib.auth.models import User, Permission


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}


class UserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"
