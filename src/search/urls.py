# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/1/25
"""
from django.urls import path

from search import views

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here


urlpatterns = [
    path("", views.SearchListView.as_view(), name="search")
]
