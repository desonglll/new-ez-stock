# TODO:
import json

# FINISH:
# ProductListCreateAPIView
# ProductDetailAPIView
# ProductUpdateAPIView
# ProductDestroyAPIView

# FIXME:

from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from api.mixins import UserQuerySetMixin, StaffEditorPermissionMixin
from api.serializers import ProductAttributeSerializer
from products.serializers import ProductSerializer
from products.models import Product, ProductAttribute
from rest_framework import generics, status
from api.models import Result


class ProductListCreateAPIView(
    # UserQuerySetMixin,
    # StaffEditorPermissionMixin,
    generics.ListCreateAPIView
):
    """
    API view for listing and creating products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated_response = self.get_paginated_response(serializer.data)

            # 计算总页数并添加到响应中
            count = paginated_response.data.get('count', 0)
            limit = request.GET.get('limit') or 10  # get limit from request
            total_pages = count // int(limit) + 1
            paginated_response.data['total_pages'] = total_pages

            return paginated_response

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        print(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        """
        隐藏user属性，不要返回到list数据里
        @param serializer:
        @return:
        """

        serializer.save(user=self.request.user)


product_list_create_view = ProductListCreateAPIView.as_view()


class ProductDetailAPIView(
    # StaffEditorPermissionMixin,
    generics.RetrieveAPIView,
    generics.DestroyAPIView
):
    """
    Product Retrieve Detail API view.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        result = Result(status='success', message='Product retrieved successfully', data=data)
        return JsonResponse(result.to_json(), status=200)

    def destroy(self, request, *args, **kwargs):
        """
        Destroy a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        self.perform_destroy(instance)
        result = Result(status="success", message="Product destroyed successfully", data=data)

        return JsonResponse(result.to_json(), status=200)

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


product_detail_view = ProductDetailAPIView.as_view()


class ProductUpdateAPIView(
    # StaffEditorPermissionMixin,
    generics.UpdateAPIView
):
    """
    API view for updating a specific product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def update(self, request, *args, **kwargs):
        """
        Override
        Update a model instance.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        request_data = request.data
        print(request_data)
        serializer = self.get_serializer(instance, data=request_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        print(serializer.validated_data)
        updated_data = serializer.data

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        result = Result(status='success', message='Product update successfully', data=updated_data)
        return JsonResponse(result.to_json(), status=200)


product_update_view = ProductUpdateAPIView.as_view()


class ProductDestroyAPIView(
    # StaffEditorPermissionMixin,
    generics.DestroyAPIView
):
    """
    API view for destroying (deleting) a specific product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        """
        Destroy a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        self.perform_destroy(instance)
        result = Result(status="success", message="Product destroyed successfully", data=data)

        return JsonResponse(result.to_json(), status=200)

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


product_destroy_view = ProductDestroyAPIView.as_view()


class ProductDestroyMultipleAPIView(
    # StaffEditorPermissionMixin,
    generics.DestroyAPIView
):
    """
    API view for destroying (deleting) multiple products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        """
        Destroy multiple model instances.
        """
        # 获取前端传递的 pk 数组
        pk_list = request.data.get("delete_list", [])

        print(pk_list)
        # 存储被删除的产品信息
        deleted_products = []

        for pk in pk_list:
            instance = Product.objects.get(pk=pk)

            if instance:
                serializer = self.get_serializer(instance)
                data = serializer.data
                self.perform_destroy(instance)
                deleted_products.append(data)

        result = Result(status="success", message="Products destroyed successfully", data=deleted_products)

        return JsonResponse(result.to_json(), status=200)

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


product_destroy_multiple_view = ProductDestroyMultipleAPIView.as_view()


class ProductAttributeDetailAPIView(generics.RetrieveAPIView):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer


product_attribute_detail_view = ProductAttributeDetailAPIView.as_view()


class ProductAttributeListCreatAPIView(generics.ListCreateAPIView):
    """
    API View 用于获取和创建产品属性列表。

    - GET 请求返回包含所有产品属性的 JSON 数据。
    - POST 请求用于创建新的产品属性。

    Attributes:
        - `queryset`: 包含所有产品属性的查询集
        - `serializer_class`: 使用的产品属性序列化器
    """
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer

    def list(self, request, *args, **kwargs):
        """
        List a queryset.
        """
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # 构建标准的JSON返回格式
        result = Result(status='success', message='Product Attribute retrieved successfully', data=data)

        # 返回JSON响应
        return JsonResponse(result.to_json(), status=200)


product_attribute_list_create_view = ProductAttributeListCreatAPIView.as_view()


class ProductAttributeUpdateAPIView(generics.UpdateAPIView):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer
    lookup_field = "pk"


product_attribute_update_view = ProductAttributeUpdateAPIView.as_view()


class ProductAttributeDestroyAPIView(generics.DestroyAPIView):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer
    lookup_field = "pk"


product_attribute_destroy_view = ProductAttributeDestroyAPIView.as_view()
