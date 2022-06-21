from django.db import models
from solo.models import SingletonModel


class SiteConfiguration(SingletonModel):
    site_name = models.CharField(
        'site name',
        max_length=255,
        default='SITE NAME',
    )
    date = models.DateTimeField(
        'date',
        null=True,
        blank=True,
    )
    url = models.URLField(
        'url',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'site configuration'


class APIConfiguration(SingletonModel):
    API_TITLE = models.CharField(
        'api title',
        max_length=255,
        default='API TITLE',
        null=True,
        blank=True,
    )
    API_DESCRIPTION = models.CharField(
        'api description',
        max_length=255,
        default='API DESCRIPTION',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'api configuration'
