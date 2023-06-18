# Generated by Django 4.2.1 on 2023-06-18 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0003_car_milage_ar'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='owner',
            field=models.CharField(blank=True, default='First Owner', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='owner_ar',
            field=models.CharField(blank=True, default='راكب أول', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='seller_type',
            field=models.CharField(blank=True, default='Individual', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='seller_type_ar',
            field=models.CharField(blank=True, default='فردي', max_length=50, null=True),
        ),
    ]