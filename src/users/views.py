from django.contrib.auth.models import User, Permission
from rest_framework import generics

from users.serializers import UserSerializer, UserPermissionSerializer


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserPermissionView(generics.ListAPIView):
    queryset = Permission.objects.all().order_by('id')
    serializer_class = UserPermissionSerializer
