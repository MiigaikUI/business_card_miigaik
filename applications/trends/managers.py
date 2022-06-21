from django.db import models


class ExamManager(models.Manager):
    def use(self):
        queryset = super().get_queryset().filter(use=True)
        return queryset if queryset else super().get_queryset().none()


class TrendManager(models.Manager):
    def calc(self, exams=None, marks=None):
        marks = marks or ['100', ]
        exams = exams or []
        marks = round(sum(map(lambda mark: int(mark), marks)) / len(marks))
        queryset = super().get_queryset()
        queryset = queryset.filter(exams__first_exam_group__id__in=exams) or queryset
        queryset = queryset.filter(exams__second_exam_group__id__in=exams) or queryset
        queryset = queryset.filter(exams__third_exam_group__id__in=exams) or queryset
        queryset = queryset.filter(mark__lte=marks) or queryset
        return queryset.order_by('mark') if queryset else super().get_queryset().none()
