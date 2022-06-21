from django.db import models

from .managers import IEEventManager


class EventBase(models.Model):
    text = models.CharField(
        'text',
        max_length=256,
        null=False,
        blank=False,
    )
    date = models.DateField(
        'date',
        null=False,
        blank=False,
    )

    class Meta:
        abstract = True
        ordering = ('date', )
        verbose_name = "event"


class IEEvent(EventBase):
    class Events(models.TextChoices):
        INTRAMURAL = 'IN', 'intramural'
        EXTRAMURAL = 'EX', 'extramural'

    objects = IEEventManager()
    event = models.CharField(
        'event',
        max_length=2,
        null=False,
        blank=False,
        default=Events.INTRAMURAL,
        choices=Events.choices,
    )
