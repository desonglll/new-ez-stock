from django.db import models

from django.conf import settings

User = settings.AUTH_USER_MODEL


class Category(models.Model):
    """Represents a category for classifying products."""

    UNCLASSIFIED = 'Unclassified'
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=255, unique=True, verbose_name='分类名称', default=UNCLASSIFIED)
    description = models.TextField(blank=True, null=True, verbose_name='分类描述')

    class Meta:
        verbose_name = '分类'
        verbose_name_plural = '分类'

    def __str__(self):
        """Returns a string representation of the category."""
        return self.name
