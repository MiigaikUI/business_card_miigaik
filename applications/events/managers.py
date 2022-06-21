from django.db import models


class IEEventManager(models.Manager):
    def intramural(self):
        queryset = super().get_queryset().filter(event='IN')
        return queryset if queryset else super().get_queryset().none()

    def extramural(self):
        queryset = super().get_queryset().filter(event='EX')
        return queryset if queryset else super().get_queryset().none()
