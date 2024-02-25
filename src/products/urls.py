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
    path("", basic.product_list_create_view, name="product_list_create"),
    path('<int:pk>/', basic.product_detail_view, name="product_detail"),
    path('delete/', basic.product_destroy_multiple_view, name="product_destroy_multiple"),
    path("product_attributes/", basic.product_attribute_list_create_view, name="product_attribute_list_create"),
    path("product_attributes/<int:pk>/", basic.product_attribute_detail_view, name="product_attribute_detail"),
]
