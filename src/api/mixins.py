# -*- coding: utf-8 -*-
"""
File: mixins
Description: 
Author: mikeshinoda
Date: 2024/1/25
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here
from .permissions import IsStaffEditorPermission
from rest_framework import permissions


class StaffEditorPermissionMixin:
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]


class UserQuerySetMixin:
    user_field = 'user'
    allow_staff_view = False

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        lookup_data = {}
        lookup_data[self.user_field] = self.request.user
        qs = super().get_queryset(*args, **kwargs)
        if self.allow_staff_view and user.is_staff:
            return qs
        return qs.filter(**lookup_data)
