from django.db import models


class AbiturManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().using('abitur_list')

    def get(self, **kwargs):
        queryset = self.get_queryset()
        filters = {}
        filtersCompGroups = {}
        for key, value in kwargs.items():
            try:
                value = int(value)
            except:
                pass
            if key in ['speciality', 'edu_level', 'edu_form', 'finance']:
                filtersCompGroups[f'{key}__in'] = value
            else:
                filters[f'{key}__in'] = value

        CompGroupsList = CompGroups.objects.all().filter(**filtersCompGroups)
        CompGroupsId = set()
        for ele in CompGroupsList:
            CompGroupsId.add(ele.comp_group_id)
        queryset = queryset.filter(**filters).filter(comp_group_id__in=CompGroupsId)
        if kwargs:
            return queryset.order_by('-wo_exam', '-points_all', '-points_sub', '-points1', '-points2', '-points3', '-points4', '-points_id',
                                     '-advantage', '-doc_type', 'soglasie')
        return queryset.none()

    def bak(self, **kwargs):
        kwargs['edu_level'] = ['Академический бакалавр']
        return self.get(**kwargs)

    def spec(self, **kwargs):
        kwargs['edu_level'] = ['Специалист']
        return self.get(**kwargs)

    def mag(self, **kwargs):
        kwargs['edu_level'] = ['Магистр']
        return self.get(**kwargs)

    def asp(self, **kwargs):
        kwargs['edu_level'] = ['Аспирантура']
        return self.get(**kwargs)


class Abitur(models.Model):
    objects = AbiturManager()
    num = models.AutoField(primary_key=True)
    fio = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    comp_group_id = models.TextField(blank=True, null=True)
    unikey = models.CharField(unique=True, max_length=255, blank=True, null=True)
    wo_exam = models.IntegerField(blank=True, null=True)
    points_all = models.TextField(blank=True, null=True)
    points_sub = models.DecimalField(max_digits=11, decimal_places=1, blank=True, null=True)
    points1 = models.TextField(blank=True, null=True)
    form_sub1 = models.TextField(blank=True, null=True)
    points2 = models.TextField(blank=True, null=True)
    form_sub2 = models.TextField(blank=True, null=True)
    points3 = models.TextField(blank=True, null=True)
    form_sub3 = models.TextField(blank=True, null=True)
    points4 = models.TextField(blank=True, null=True)
    form_sub4 = models.TextField(blank=True, null=True)
    points_id = models.IntegerField(blank=True, null=True)
    att_points = models.DecimalField(max_digits=11, decimal_places=2, blank=True, null=True)
    passed = models.IntegerField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    doc_type = models.TextField(blank=True, null=True)
    soglasie = models.CharField(max_length=3, blank=True, null=True)
    advantage = models.CharField(max_length=3, blank=True, null=True)
    condition = models.TextField(blank=True, null=True)
    cel_org = models.TextField(blank=True, null=True)
    update = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'main'


class CompGroupsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().using('abitur_list')

    def bak(self, **kwargs):
        try:
            pk = [ele.comp_group_id for ele in Abitur.objects.bak(**kwargs)][0]
            return self.get_queryset().filter(
                comp_group_id__in=[pk])
        except:
            return self.get_queryset().none()

    def spec(self, **kwargs):
        try:
            pk = [ele.comp_group_id for ele in Abitur.objects.spec(**kwargs)][0]
            return self.get_queryset().filter(
                comp_group_id__in=[pk])
        except:
            return self.get_queryset().none()

    def mag(self, **kwargs):
        try:
            pk = [ele.comp_group_id for ele in Abitur.objects.mag(**kwargs)][0]
            return self.get_queryset().filter(
                comp_group_id__in=[pk])
        except:
            return self.get_queryset().none()

    def asp(self, **kwargs):
        try:
            pk = [ele.comp_group_id for ele in Abitur.objects.asp(**kwargs)][0]
            return self.get_queryset().filter(
                comp_group_id__in=[pk])
        except:
            return self.get_queryset().none()


from django.db import models


class CompGroups(models.Model):
    objects = CompGroupsManager()
    comp_group_id = models.CharField(max_length=255, db_collation='utf8_general_ci')
    comp_group = models.CharField(max_length=255, db_collation='utf8_general_ci')
    subject = models.CharField(max_length=255, db_collation='utf8_general_ci')
    priority = models.IntegerField()
    speciality = models.CharField(max_length=255)
    edu_level = models.CharField(max_length=255)
    edu_form = models.CharField(max_length=255)
    finance = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'comp_groups'