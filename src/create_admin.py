# -*- coding: utf-8 -*-
"""
File: create_admin
Description: 
Author: mikeshinoda
Date: 2024/3/3
"""

# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here
import os
import django


def create_admin(username, email, password):
    # 设置环境变量
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'EzStock.settings')
    django.setup()

    # 导入用户模型
    from django.contrib.auth.models import User

    # 检查管理员是否已存在
    if not User.objects.filter(username=username).exists():
        # 创建管理员用户
        User.objects.create_superuser(username, email, password)
        print("管理员用户已创建成功")
    else:
        print("管理员用户已存在")


if __name__ == "__main__":
    # 替换为你想要的管理员用户名、邮箱和密码
    admin_username = 'mike'
    admin_email = 'lindesong666@gmail.com'
    admin_password = '070011'

    create_admin(admin_username, admin_email, admin_password)
