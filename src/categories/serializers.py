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
    parent_name = serializers.SerializerMethodField()  # 添加一个自定义字段

    def get_parent_name(self, obj):
        if obj.parent:
            print(obj.parent)
            return obj.parent.name
        else:
            return None

    class Meta:
        model = Category
        fields = [
            "user",
            "pk",
            "name",
            "description",
            "parent",
            "parent_name"
        ]
