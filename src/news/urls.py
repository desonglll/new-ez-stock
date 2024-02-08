# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/2/7
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here

from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_all_news),
    path("add/", views.news_list_create_view),
    path('<int:pk>/', views.get_news_by_pk),
]
