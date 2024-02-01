# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/1/20
"""

# TODO: Add your code here

from .views import basic
from django.urls import path

"""
get -> list -> Queryset
get -> retrieve -> Product Instance Detail View
post -> create -> New Instance
put -> Update
delete -> destroy
"""
urlpatterns = [
    # URL 模式用于获取和创建商品列表
    # 获取所有产品列表：
    #     Endpoint: /api/products/
    #     方法: GET
    #     返回所有产品的列表。
    path("", basic.product_list_create_view, name="product_list_create"),

    # URL 模式用于获取特定商品的详细信息
    # 获取单个产品详情：
    #     Endpoint: /api/products/<product_id>/
    #     方法: GET
    #     返回特定产品的详细信息。
    path('<int:pk>/', basic.product_detail_view, name="product_detail"),

    # URL 模式用于更新特定商品的信息
    # 更新产品信息：
    #     Endpoint: /api/products/<product_id>/update/
    #     方法: PUT or PATCH
    #     允许用户更新特定产品的信息。
    path('<int:pk>/update/', basic.product_update_view, name="product_update"),
    # URL 模式用于删除特定商品
    # 删除产品：
    #     Endpoint: /api/products/<product_id>/delete/
    #     方法: DELETE
    #     允许用户删除特定产品。
    path('<int:pk>/delete/', basic.product_destroy_view, name="product_destroy"),
    path('delete/', basic.product_destroy_multiple_view, name="product_destroy_multiple"),
]
