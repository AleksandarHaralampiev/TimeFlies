# Generated by Django 5.0.3 on 2024-04-01 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0002_alter_timeline_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeline',
            name='date_modifired',
            field=models.DateTimeField(),
        ),
    ]
