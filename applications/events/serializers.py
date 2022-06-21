from rest_framework import serializers

from .models import IEEvent


class IEEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = IEEvent
        fields = '__all__'
