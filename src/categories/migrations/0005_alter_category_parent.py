# Generated by Django 5.0 on 2024-03-12 01:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0004_category_parent_delete_treecategory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(blank=True, default=-1, null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.category'),
        ),
    ]
