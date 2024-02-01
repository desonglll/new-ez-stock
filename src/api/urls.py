# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/1/20
"""

# TODO: Add your code here

from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import authentication
from api.views import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from api.views.views import SignUpView
from .views.upload_views import ImageUploadView

urlpatterns = [
    # 用于Token的验证
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/', authentication.JWTTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # URL 模式用于获取和创建商品属性信息
    path("product_attributes/", views.product_attribute_list_create_view, name="product_attribute_list_create"),
    # URL 模式用于获取商品详细信息
    path("product_info/", views.product_info_view, name="product_info_view"),
    path('auth/', obtain_auth_token),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
]
