# -*- coding: utf-8 -*-
"""
File: basic.py
Description: 
Author: mikeshinoda
Date: 2024/1/22
"""

# TODO: Add your code here

# FINISH: Add your code here
# CategoryListCreatAPIView
# CategoryDetailAPIView
# CategoryUpdateAPIView
# CategoryDestroyAPIView

# FIXME: Add your code here


from django.http import JsonResponse
from rest_framework import generics

from api.mixins import UserQuerySetMixin, StaffEditorPermissionMixin
from api.models import Result
from categories.models import Category
from categories.serializers import CategorySerializer


class CategoryListCreatAPIView(
    UserQuerySetMixin,
    generics.ListCreateAPIView
):
    """
    API View 用于获取和创建产品分类列表。

    - GET 请求返回包含所有产品分类的 JSON 数据。
    - POST 请求用于创建新的产品分类。

    Attributes:
        - `queryset`: 包含所有产品分类的查询集
        - `serializer_class`: 使用的产品分类序列化器
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def list(self, request, *args, **kwargs):
    #     """
    #     List a queryset.
    #     """
    #     queryset = self.filter_queryset(self.get_queryset())
    #
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(queryset, many=True)
    #     data = serializer.data
    #
    #     # 构建标准的JSON返回格式
    #     result = Result(status='success', message='Category retrieved successfully', data=data)
    #
    #     # 返回JSON响应
    #     return JsonResponse(result.to_json(), status=200)


category_list_create_view = CategoryListCreatAPIView.as_view()


class CategoryDetailAPIView(generics.RetrieveAPIView):
    """
    Category Retrieve Detail API view.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        result = Result(status='success', message='Category retrieved successfully', data=data)
        return JsonResponse(result.to_json(), status=200)


category_detail_view = CategoryDetailAPIView.as_view()


class CategoryUpdateAPIView(generics.UpdateAPIView):
    """
    API view for updating a specific category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        """
        Override
        Update a model instance.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        updated_data = serializer.data

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        result = Result(status='success', message='Category update successfully', data=updated_data)
        return JsonResponse(result.to_json(), status=200)


category_update_view = CategoryUpdateAPIView.as_view()


class CategoryDestroyAPIView(generics.DestroyAPIView):
    """
    API view for destroying (deleting) a specific category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        """
        Destroy a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        self.perform_destroy(instance)
        result = Result(status="success", message="Category destroyed successfully", data=data)

        return JsonResponse(result.to_json(), status=200)

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


category_destroy_view = CategoryDestroyAPIView.as_view()


def get_parent_categories(request):
    data = Category.objects.filter(parent=None)
    serializer = CategorySerializer(data, many=True)
    result = Result(status="success", message="CategoryParent", data=serializer.data)
    return JsonResponse(result.to_json(), status=200)


def get_sub_categories(request):
    data = Category.objects.filter(parent__isnull=False)
    serializer = CategorySerializer(data, many=True)
    result = Result(status="success", message="CategorySub", data=serializer.data)
    return JsonResponse(result.to_json(), status=200)


def get_all_categories(request):
    data = Category.objects.all()
    serializer = CategorySerializer(data, many=True)
    result = Result(status="success", message="All Categories", data=serializer.data)
    return JsonResponse(result.to_json(), status=200)
