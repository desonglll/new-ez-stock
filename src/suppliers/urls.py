# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/1/22
"""
# TODO: Add your code here
from django.urls import path

from suppliers import views

urlpatterns = [
    path('', views.supplier_list_create_view, name='supplier_list_create'),
    path('<int:pk>/', views.supplier_detail_view, name='supplier_detail'),
    path('<int:pk>/update/', views.supplier_update_view, name="supplier_update"),
    path('<int:pk>/delete/', views.supplier_destroy_view, name="supplier_destroy"),
]
