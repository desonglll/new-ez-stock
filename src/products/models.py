from django.db import models
from django.db.models import Q
from django.utils import timezone

from categories.models import Category

from django.conf import settings

User = settings.AUTH_USER_MODEL


def generate_default_sku():
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    return f'SKU-{timestamp}'


class ProductAttribute(models.Model):
    """Represents an attribute associated with a product."""
    name = models.CharField(max_length=255, verbose_name='属性名称')
    value = models.CharField(max_length=255, verbose_name='属性值')

    class Meta:
        verbose_name = '产品属性'
        verbose_name_plural = '产品属性'

    def __str__(self):
        """Returns a string representation of the product attribute."""

        return f'{self.name}: {self.value}'


# 产品状态
class ProductStatus(models.TextChoices):
    """Enumerates the possible statuses for a product."""

    DRAFT = 'draft', '草稿'
    PUBLISHED = 'published', '已发布'
    ARCHIVED = 'archived', '已归档'


class ProductQuerySet(models.QuerySet):
    def is_public(self):
        return self.filter(public=True)

    def search(self, query, user=None):
        lookup = Q(name__icontains=query) | Q(description__icontains=query)
        qs = self.is_public().filter(lookup)
        if user is not None:
            qs2 = self.filter(user=user).filter(lookup)
            qs = (qs | qs2).distinct()
        return qs


class ProductManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return ProductQuerySet(self.model, using=self._db)

    def search(self, query, user=None):
        return self.get_queryset().search(query, user=user)


class Product(models.Model):
    """Represents a product in the inventory."""
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL, verbose_name='谁可见')

    # 基本信息
    name = models.CharField(max_length=255, verbose_name='产品名称')
    description = models.TextField(blank=True, null=True, verbose_name='产品描述')
    sku = models.CharField(max_length=50, unique=True, default=generate_default_sku, verbose_name='SKU 编号')
    image = models.CharField(max_length=255, blank=True, null=True, verbose_name='产品图片')

    # 价格和销售信息
    price = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, verbose_name='价格')
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True,
                                         verbose_name='折扣价格')
    is_discounted = models.BooleanField(default=False, verbose_name='是否打折')
    is_valid = models.BooleanField(default=False, verbose_name='是否有效')

    # 库存信息
    stock_quantity = models.PositiveIntegerField(default=0, verbose_name='库存数量')
    is_in_stock = models.BooleanField(default=True, verbose_name='是否有库存')

    # 分类信息
    categories = models.ManyToManyField('categories.Category', related_name='products', verbose_name='产品分类',
                                        blank=True,
                                        default=[Category.UNCLASSIFIED])

    # 时间戳信息
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    # 产品属性
    attributes = models.ManyToManyField('ProductAttribute', related_name='products', blank=True,
                                        verbose_name='产品属性')

    # 供应商信息
    supplier = models.OneToOneField('suppliers.Supplier', on_delete=models.SET_NULL, null=True, blank=True,
                                    verbose_name='供应商')

    # 库存属性
    weight = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='重量')
    dimensions = models.CharField(max_length=50, blank=True, null=True, verbose_name='尺寸')

    status = models.CharField(
        max_length=20,
        choices=ProductStatus.choices,
        default=ProductStatus.DRAFT,
        verbose_name='产品状态'
    )

    public = models.BooleanField(default=True)

    objects = ProductManager()

    class Meta:
        verbose_name = '产品'
        verbose_name_plural = '产品'

    def __str__(self):
        return self.name
