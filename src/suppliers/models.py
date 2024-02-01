from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Supplier(models.Model):
    """Represents a supplier providing products."""
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=255, unique=True, verbose_name='供应商名称')
    contact_person = models.CharField(max_length=255, blank=True, null=True, verbose_name='联系人')
    contact_email = models.EmailField(blank=True, null=True, verbose_name='联系邮箱')
    contact_phone = models.CharField(max_length=20, blank=True, null=True, verbose_name='联系电话')

    class Meta:
        verbose_name = '供应商'
        verbose_name_plural = '供应商'

    def __str__(self):
        """Returns a string representation of the supplier."""

        return self.name
