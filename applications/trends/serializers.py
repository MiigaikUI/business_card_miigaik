from rest_framework import serializers

from .models import Exam, Trend, ExamGroups


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'


class ExamGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamGroups
        fields = '__all__'


class TrendSerializer(serializers.ModelSerializer):
    exams = ExamGroupSerializer()

    class Meta:
        model = Trend
        fields = '__all__'
