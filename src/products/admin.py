from django.contrib import admin

from categories.models import Category
from suppliers.models import Supplier
from .models import Product, ProductAttribute


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "sku",
        "display_categories",
        "display_attributes",
        "supplier",
    ]

    def display_attributes(self, obj):
        return ", ".join([str(attr) for attr in obj.attributes.all()])

    def display_categories(self, obj):
        return ", ".join([str(cate) for cate in obj.categories.all()])


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(Supplier)
admin.site.register(ProductAttribute)
