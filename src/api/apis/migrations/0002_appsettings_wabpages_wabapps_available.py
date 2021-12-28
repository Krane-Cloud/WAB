# Generated by Django 4.0 on 2021-12-28 08:20

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('value', models.CharField(max_length=128, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='WABPages',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('appID', models.UUIDField(db_index=True)),
                ('appPageID', models.BigIntegerField()),
                ('html_content', models.BinaryField(blank=True, null=True)),
                ('js_content', models.BinaryField(blank=True, null=True)),
                ('added_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('available', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'WABPages',
            },
        ),
        migrations.AddField(
            model_name='wabapps',
            name='available',
            field=models.BooleanField(default=True),
        ),
    ]
