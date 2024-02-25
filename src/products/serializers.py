# -*- coding: utf-8 -*-
"""
File: serializer
Description: 
Author: mikeshinoda
Date: 2024/1/20
"""

# TODO: Add your code here

from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Product
from api.serializers import UserPublicSerializer


class ProductInlineSerializer(serializers.Serializer):
    """
    Only use ModelSerializer when you need to override create, update or something functions!!!
    """
    url = serializers.HyperlinkedIdentityField(
        view_name="product_detail",
        lookup_field='pk',
        read_only=True
    )
    name = serializers.CharField(read_only=True)


class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="product_detail", lookup_field='pk')
    owner = UserPublicSerializer(source='user', read_only=True)
    # edit_url = serializers.SerializerMethodField(read_only=True)
    other_products = ProductInlineSerializer(
        source="user.product_set.all",
        read_only=True,
        many=True
    )

    class Meta:
        model = Product
        fields = [
            # 'user',  # hidden user field
            "owner",
            "url",
            # "edit_url",
            "pk",
            "name",
            "description",
            "sku",
            "image",
            "price",
            "discount_price",
            "is_discounted",
            "is_valid",
            "stock_quantity",
            "is_in_stock",
            "categories",
            "created_at",
            "updated_at",
            "attributes",
            "supplier",
            "weight",
            "dimensions",
            "other_products"
        ]
    #
    # def get_edit_url(self, obj):
    #     request = self.context.get('request')
    #     if request is None:
    #         return None
    #     return reverse("product_detail", kwargs={'pk': obj.pk}, request=request)
