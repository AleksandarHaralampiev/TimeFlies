# Generated by Django 5.0.3 on 2024-03-08 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticate', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='profile_picture',
            field=models.ImageField(default='default.png', upload_to='post_images'),
        ),
    ]
