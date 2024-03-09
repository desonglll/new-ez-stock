# Generated by Django 5.0 on 2024-03-09 09:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_product_user'),
        ('suppliers', '0002_supplier_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='supplier',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='suppliers.supplier', verbose_name='供应商'),
        ),
    ]
