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
from suppliers.models import Supplier


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = [
            "user",
            'pk',
            'name',
            'contact_person',
            'contact_email',
            'contact_phone'
        ]


class SupplierProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = [
            "product_count"
        ]
