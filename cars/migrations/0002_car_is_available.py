# Generated by Django 4.0.4 on 2022-06-04 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
    ]
