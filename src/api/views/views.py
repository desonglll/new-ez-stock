# -*- coding: utf-8 -*-
"""
File: basic.py
Description:
Author: mikeshinoda
Date: 2024/1/22
"""
from django.contrib.auth import get_user_model
from django.core.serializers import serialize
from django.db.models import Count
# TODO: Add your code here

# FINISH: Add your code here
# ProductAttributeListCreatAPIView
# ProductInfoAPIView

# FIXME: Add your code here

from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

from products.models import Category, ProductAttribute, Product
from suppliers.models import Supplier
from api.models import Result
from api.serializers import ProductAttributeSerializer, UserSerializer
from suppliers.serializers import SupplierProductSerializer
from rest_framework import generics


class ProductAttributeListCreatAPIView(generics.ListCreateAPIView):
    """
    API View 用于获取和创建产品属性列表。

    - GET 请求返回包含所有产品属性的 JSON 数据。
    - POST 请求用于创建新的产品属性。

    Attributes:
        - `queryset`: 包含所有产品属性的查询集
        - `serializer_class`: 使用的产品属性序列化器
    """
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer

    def list(self, request, *args, **kwargs):
        """
        List a queryset.
        """
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # 构建标准的JSON返回格式
        result = Result(status='success', message='Product Attribute retrieved successfully', data=data)

        # 返回JSON响应
        return JsonResponse(result.to_json(), status=200)


product_attribute_list_create_view = ProductAttributeListCreatAPIView.as_view()


class ProductInfoAPIView(generics.GenericAPIView):
    """
    API View 用于获取产品信息。

    GET 请求返回包含产品分类数量和所有产品属性的 JSON 数据。

    Attributes:
        - `categories_count`: 产品分类数量
        - `product_attributes`: 所有产品属性的序列化数据
    """

    def get(self, request, *args, **kwargs):
        # Get count products
        products_count = Product.objects.all().count()
        # 获取产品分类数量
        categories_count = Category.objects.count()
        # 获取所有产品属性
        product_attributes = ProductAttribute.objects.all()
        product_attributes_serializer = ProductAttributeSerializer(product_attributes, many=True)
        valid_products_count = Product.objects.filter(is_valid=True).count()
        # 使用 annotate 和 Count 获取每个供应商的产品数量
        supplier_data = Supplier.objects.annotate(product_count=Count('product'))
        supplier_info = []
        for item in supplier_data:
            supplier_info.append({
                "pk": item.pk,
                "user": item.user.id,
                "name": item.name,
                "product_count": item.product_count
            })
        print(supplier_info)

        # 构建结果
        result_data = {
            'categories_count': categories_count,
            'product_attributes': product_attributes_serializer.data,
            "products_count": products_count,
            "valid_products_count": valid_products_count,
            "supplier_info": supplier_info
        }
        result = Result(status='success', data=result_data, message="Product information returned successfully")
        return JsonResponse(result.to_json(), status=200)


product_info_view = ProductInfoAPIView.as_view()


class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer  # 使用你的序列化器
    permission_classes = [AllowAny]

    def create_user(self, validated_data):
        """
        创建用户并返回创建的用户对象
        """
        user = User.objects.create_user(**validated_data, is_staff=True)
        print("Created a user")
        print(user)
        return user

    def perform_create(self, serializer):
        # 调用 create_user 方法，传递验证后的数据
        user = self.create_user(serializer.validated_data)
        serializer.instance = user
