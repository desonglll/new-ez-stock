# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/2/29
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here

from django.urls import path
from .views import UserListView, UserPermissionView

urlpatterns = [
    path("", UserListView.as_view()),
    path("permissions/", UserPermissionView.as_view())
]
