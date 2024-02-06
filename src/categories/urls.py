# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/1/22
"""
from django.urls import path

from categories import views

# TODO: Add your code here

urlpatterns = [
    path("", views.category_list_create_view, name="category_list_create"),
    path('<int:pk>/', views.category_detail_view, name='category_detail'),
    path('<int:pk>/update/', views.category_update_view, name="category_update"),
    path('<int:pk>/delete/', views.category_destroy_view, name="category_destroy"),
    path('get_parent/', views.get_parent_categories),
    path('get_sub/', views.get_sub_categories)
]
