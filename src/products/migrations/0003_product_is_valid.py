# Generated by Django 5.0 on 2024-01-28 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_public'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_valid',
            field=models.BooleanField(default=False, verbose_name='是否有效'),
        ),
    ]
