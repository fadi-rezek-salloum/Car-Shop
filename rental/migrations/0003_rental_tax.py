# Generated by Django 4.0.4 on 2022-06-04 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rental', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='rental',
            name='tax',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
