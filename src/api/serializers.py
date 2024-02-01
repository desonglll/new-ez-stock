# -*- coding: utf-8 -*-
"""
File: serializer
Description: 
Author: mikeshinoda
Date: 2024/1/20
"""

# TODO: Add your code here

from rest_framework import serializers

from api.models import UploadedImage
from products.models import ProductAttribute
from django.contrib.auth.models import User


class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = [
            "pk",
            "name",
            "value"
        ]


class UserPublicSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        # extra_kwargs = {'password': {'write_only': True}}


class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ('image',)
