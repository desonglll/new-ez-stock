# -*- coding: utf-8 -*-
"""
File: serializers
Description: 
Author: mikeshinoda
Date: 2024/2/7
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here

from rest_framework import serializers
from .models import News


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"
