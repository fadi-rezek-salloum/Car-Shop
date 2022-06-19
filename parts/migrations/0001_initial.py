# Generated by Django 4.0.4 on 2022-06-04 12:09

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('picture', models.ImageField(upload_to='parts/')),
                ('brand', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=60)),
                ('in_stock', models.IntegerField(default=1)),
                ('price', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
        ),
    ]
