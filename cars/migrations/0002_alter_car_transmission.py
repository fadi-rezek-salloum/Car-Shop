# Generated by Django 4.2.1 on 2023-06-09 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='transmission',
            field=models.CharField(choices=[('M', 'Manual'), ('A', 'Automatic')], max_length=15),
        ),
    ]
