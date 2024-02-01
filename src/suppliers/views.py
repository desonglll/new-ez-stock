# TODO:

# FINISH:
# SupplierListCreateAPIView
# SupplierDetailAPIView
# SupplierUpdateAPIView
# SupplierDestroyAPIView

# FIXME:

from django.http import JsonResponse
from rest_framework import generics

from api.mixins import UserQuerySetMixin, StaffEditorPermissionMixin
from api.models import Result
from suppliers.serializers import SupplierSerializer
from suppliers.models import Supplier


class SupplierListCreateAPIView(
    UserQuerySetMixin,
    StaffEditorPermissionMixin,
    generics.ListCreateAPIView
):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


supplier_list_create_view = SupplierListCreateAPIView.as_view()


class SupplierDetailAPIView(
    StaffEditorPermissionMixin,
    generics.RetrieveAPIView
):
    """
    Supplier Retrieve Detail API view.
    """
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        result = Result(status='success', message='Supplier retrieved successfully', data=data)
        return JsonResponse(result.to_json(), status=200)


supplier_detail_view = SupplierDetailAPIView.as_view()


class SupplierUpdateAPIView(
    StaffEditorPermissionMixin,
    generics.UpdateAPIView
):
    """
    API view for updating a specific supplier.
    """
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        """
        Override
        Update a model instance.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        updated_data = serializer.data

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        result = Result(status='success', message='Supplier update successfully', data=updated_data)
        return JsonResponse(result.to_json(), status=200)


supplier_update_view = SupplierUpdateAPIView.as_view()


class SupplierDestroyAPIView(
    StaffEditorPermissionMixin,
    generics.DestroyAPIView
):
    """
    API view for destroying (deleting) a specific supplier.
    """
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        """
        Destroy a model instance.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        self.perform_destroy(instance)
        result = Result(status="success", message="Supplier destroyed successfully", data=data)

        return JsonResponse(result.to_json(), status=200)

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


supplier_destroy_view = SupplierDestroyAPIView.as_view()
