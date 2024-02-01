# -*- coding: utf-8 -*-
"""
File: upload_views
Description: 
Author: mikeshinoda
Date: 2024/1/30
"""
# TODO: Add your code here
# FINISH: Add your code here
# FIXME: Add your code here
# views.py
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

from api.serializers import ImageUploadSerializer


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)

        if serializer.is_valid():
            # 保存上传的图片
            instance = serializer.save()

            # 获取图片的URL
            image_url = request.build_absolute_uri(instance.image.url)

            return Response({'status': 'success', 'message': 'Image uploaded successfully', 'image_url': image_url},
                            status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
