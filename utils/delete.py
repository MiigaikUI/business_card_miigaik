from django.db import models
from rest_framework import serializers


class ModelDSManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().exclude(delete=True)


class ModelDS(models.Model):
    objects = ModelDSManager()
    delete = models.BooleanField(
        default=False,
        blank=False,
        null=False,
    )

    def delete(self, using=None, keep_parents=False):
        if self.pk is None or self.delete is True:
            raise ValueError(
                "%s object can't be deleted because its %s attribute is set"
                "to None." % (self._meta.object_name, self._meta.pk.attname)
            )
        self.delete = True


class ModelDSSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(self.__class__, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)
        self.fields.pop('delete')
