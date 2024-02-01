# -*- coding: utf-8 -*-
"""
File: authentication
Description: 
Author: mikeshinoda
Date: 2024/1/25
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here
from rest_framework.authentication import TokenAuthentication as BaseTokenAuth
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class TokenAuthentication(BaseTokenAuth):
    # keyword = "Bearer"
    keyword = "Token"


class JWTTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
