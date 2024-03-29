# Generated by Django 5.0.3 on 2024-03-07 18:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("server", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Timeline",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("date_modifired", models.DateTimeField(auto_now=True)),
                (
                    "server",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="server.server"
                    ),
                ),
            ],
        ),
    ]
