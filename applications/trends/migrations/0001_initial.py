# Generated by Django 4.0.5 on 2022-06-21 22:37

import applications.trends.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, unique=True, verbose_name='title')),
                ('type', models.CharField(max_length=256, verbose_name='type')),
                ('feature', models.CharField(blank=True, max_length=1024, null=True, verbose_name='feature')),
                ('use', models.BooleanField(default=False, verbose_name='unified state examination')),
            ],
            options={
                'verbose_name': 'exam',
                'verbose_name_plural': 'exams',
            },
        ),
        migrations.CreateModel(
            name='ExamGroups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_exam_group', models.ManyToManyField(related_name='first_trend_group', to='trends.exam')),
                ('second_exam_group', models.ManyToManyField(related_name='second_trend_group', to='trends.exam')),
                ('third_exam_group', models.ManyToManyField(related_name='third_trend_group', to='trends.exam')),
            ],
        ),
        migrations.CreateModel(
            name='Trend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=8, unique=True, validators=[applications.trends.models.validate_code], verbose_name='code')),
                ('title', models.CharField(max_length=256, unique=True, verbose_name='title')),
                ('mark', models.PositiveIntegerField(blank=True, null=True, verbose_name='mark')),
                ('budget', models.PositiveIntegerField(blank=True, null=True, verbose_name='budget seats')),
                ('paid', models.PositiveIntegerField(blank=True, null=True, verbose_name='paid seats')),
                ('description', models.TextField(blank=True, null=True, verbose_name='description')),
                ('exams', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='trends', to='trends.examgroups')),
            ],
            options={
                'verbose_name': 'trend',
                'verbose_name_plural': 'trends',
            },
        ),
    ]
