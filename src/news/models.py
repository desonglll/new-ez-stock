from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL, verbose_name='Author')

    class Meta:
        verbose_name = '新闻'
        verbose_name_plural = '新闻'

    def __str__(self):
        return self.title
