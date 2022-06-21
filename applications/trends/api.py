from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Exam, Trend
from .serializers import ExamSerializer, TrendSerializer


class ExamViewSet(ReadOnlyModelViewSet):
    queryset = Exam.objects
    serializer_class = ExamSerializer

    @action(methods=['get'], detail=False)
    def use(self, request):
        queryset = self.get_queryset().use()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class TrendViewSet(ReadOnlyModelViewSet):
    queryset = Trend.objects
    serializer_class = TrendSerializer

    @action(methods=['get'], detail=False)
    def calc(self, request):
        queryset = self.get_queryset().calc(**request.GET)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
