# -*- coding: utf-8 -*-
"""
File: authentication
Description: 
Author: mikeshinoda
Date: 2024/1/25
"""
from django.contrib.auth.models import User
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

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = User.objects.get(username=request.data.get('username'))
            token_data = response.data
            token_data['username'] = user.username
            token_data['user_id'] = user.id
            response.data = token_data
        return response
