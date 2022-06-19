# Generated by Django 4.0.4 on 2022-06-04 12:09

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('parts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('notes', models.TextField(blank=True, null=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('part', models.ManyToManyField(related_name='car_parts_bill', to='parts.part')),
            ],
        ),
    ]