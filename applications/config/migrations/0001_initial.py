# Generated by Django 4.0.5 on 2022-06-21 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='APIConfiguration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('API_TITLE', models.CharField(blank=True, default='API TITLE', max_length=255, null=True, verbose_name='api title')),
                ('API_DESCRIPTION', models.CharField(blank=True, default='API DESCRIPTION', max_length=255, null=True, verbose_name='api description')),
            ],
            options={
                'verbose_name': 'api configuration',
            },
        ),
        migrations.CreateModel(
            name='SiteConfiguration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(default='SITE NAME', max_length=255, verbose_name='site name')),
                ('date', models.DateTimeField(blank=True, null=True, verbose_name='date')),
                ('url', models.URLField(blank=True, null=True, verbose_name='url')),
            ],
            options={
                'verbose_name': 'site configuration',
            },
        ),
    ]
