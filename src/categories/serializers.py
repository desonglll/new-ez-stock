# -*- coding: utf-8 -*-
"""
File: serializers
Description: 
Author: mikeshinoda
Date: 2024/1/22
"""

# TODO:

# FINISH:

# FIXME:

from rest_framework import serializers
from categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "user",
            "pk",
            "name",
            "description"
        ]
