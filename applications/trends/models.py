from django.core.exceptions import ValidationError
from django.db import models
from re import search

from .managers import TrendManager, ExamManager


class Exam(models.Model):
    objects = ExamManager()
    title = models.CharField(
        'title',
        max_length=256,
        null=False,
        blank=False,
        unique=True,
    )
    type = models.CharField(
        'type',
        max_length=256,
        null=False,
        blank=False,
    )
    feature = models.CharField(
        'feature',
        max_length=1024,
        null=True,
        blank=True,
    )
    use = models.BooleanField(
        'unified state examination',
        default=False,
    )
    min_mark = models.PositiveIntegerField(
        'minimal mark',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'exam'
        verbose_name_plural = 'exams'


class ExamGroups(models.Model):
    first_exam_group = models.ManyToManyField(
        Exam,
        related_name='first_trend_group',
    )
    second_exam_group = models.ManyToManyField(
        Exam,
        related_name='second_trend_group',
    )
    third_exam_group = models.ManyToManyField(
        Exam,
        related_name='third_trend_group',
    )


def validate_code(value):
    if value == search(r'(\d{2}\.){2}\d{2}', value).group(0):
        pass
    else:
        raise ValidationError(
            _('%(value)s is not an correct code'),
            params={'value': value},
        )


class Trend(models.Model):
    objects = TrendManager()
    code = models.CharField(
        'code',
        validators=[validate_code],
        max_length=8,
        null=False,
        blank=False,
        unique=True,
    )
    title = models.CharField(
        'title',
        max_length=256,
        null=False,
        blank=False,
        unique=True,
    )
    exams = models.ForeignKey(
        ExamGroups,
        on_delete=models.SET_NULL,
        related_name='trends',
        null=True,
    )
    mark = models.PositiveIntegerField(
        'mark',
        null=True,
        blank=True,
    )
    budget = models.PositiveIntegerField(
        'budget seats',
        null=True,
        blank=True,
    )
    paid = models.PositiveIntegerField(
        'paid seats',
        null=True,
        blank=True,
    )
    education_form = models.CharField(
        'education form',
        max_length=20,
        blank=True,
    )
    education_level = models.CharField(
        'education level',
        max_length=128,
        blank=True,
    )
    description = models.TextField(
        'description',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'trend'
        verbose_name_plural = 'trends'
