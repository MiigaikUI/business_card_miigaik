from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import IEEvent
from .serializers import IEEventSerializer


class IntramuralEventViewSet(ReadOnlyModelViewSet):
    queryset = IEEvent.objects.intramural()
    serializer_class = IEEventSerializer


class ExtramuralEventViewSet(ReadOnlyModelViewSet):
    queryset = IEEvent.objects.extramural()
    serializer_class = IEEventSerializer
