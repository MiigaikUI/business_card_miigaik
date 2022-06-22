from collections import OrderedDict

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Abitur, CompGroups
from .serializers import AbiturBakShortSerializer, AbiturBakSerializer, AbiturSerializer, \
    CompGroupsSerializer, AbiturNotBakShortSerializer, AbiturNotBakSerializer, AbiturBakOrgSerializer, AbiturNotBakOrgSerializer, \
    CompGroupsExtendSerializer


class AbiturViewSet(ReadOnlyModelViewSet):
    queryset = Abitur.objects

    def list(self, request, *args, **kwargs):
        return Response(None)

    @action(methods=['get'], detail=False)
    def get_parameters(self, request):
        queryset = self.get_queryset()
        serializer = AbiturSerializer(queryset, many=True)
        queryset_comp = CompGroups.objects.all()
        serializer = AbiturSerializer(queryset, many=True)
        serializer_comp = CompGroupsExtendSerializer(queryset_comp, many=True)
        result = dict.fromkeys(['speciality', 'edu_level', 'edu_form', 'finance', 'soglasie', 'doc_type'])
        for key in result.keys(): result[key] = set()
        for obj in serializer.data:
            for key, value in obj.items():
                if key in ['soglasie', 'doc_type']:
                    result[key].add(value)
        for obj in serializer_comp.data:
            for key, value in obj.items():
                if key in ['speciality', 'edu_level', 'edu_form', 'finance']:
                    result[key].add(value)
        for key in result.keys(): result[key] = sorted(list(result[key]))
        return Response(result)

    @action(methods=['get'], detail=False)
    def bak(self, request):
        queryset = self.get_queryset().bak(**request.GET)
        try:
            if request.GET['finance'] == 'Бюджетная (целевой прием)':
                serializer_class = AbiturBakOrgSerializer

            else:
                serializer_class = AbiturBakSerializer
        except:
            serializer_class = AbiturBakSerializer
        serializer = serializer_class(queryset, many=True)
        diff = self.par_bak(request).data
        del diff['id']
        result = []
        for ele in serializer.data:
            result.append({})
            for key in diff.keys():
                result[-1][key] = ele[key]
        return Response(result)

    @action(methods=['get'], detail=False)
    def spec(self, request):
        queryset = self.get_queryset().spec(**request.GET)
        try:
            if request.GET['finance'] == 'Бюджетная (целевой прием)':
                serializer_class = AbiturBakOrgSerializer

            else:
                serializer_class = AbiturBakSerializer
        except:
            serializer_class = AbiturBakSerializer
        serializer = serializer_class(queryset, many=True)
        diff = self.par_spec(request).data
        del diff['id']
        result = []
        for ele in serializer.data:
            result.append({})
            for key in diff.keys():
                result[-1][key] = ele[key]
        return Response(result)

    @action(methods=['get'], detail=False)
    def mag(self, request):
        queryset = self.get_queryset().mag(**request.GET)
        try:
            if request.GET['finance'] == 'Бюджетная (целевой прием)':
                serializer = AbiturNotBakOrgSerializer(queryset, many=True)
            else:
                serializer = AbiturNotBakSerializer(queryset, many=True)
        except:
            serializer = AbiturNotBakSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def asp(self, request):
        queryset = self.get_queryset().asp(**request.GET)
        try:
            if request.GET['finance'] == 'Бюджетная (целевой прием)':
                serializer = AbiturNotBakOrgSerializer(queryset, many=True)
            else:
                serializer = AbiturNotBakSerializer(queryset, many=True)
        except:
            serializer = AbiturNotBakSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def bak_short(self, request):
        queryset = self.get_queryset().bak(**request.GET)
        serializer = AbiturBakShortSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def spec_short(self, request):
        queryset = self.get_queryset().bak(**request.GET)
        serializer = AbiturBakShortSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def mag_short(self, request):
        queryset = self.get_queryset().bak(**request.GET)
        serializer = AbiturNotBakShortSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def asp_short(self, request):
        queryset = self.get_queryset().asp(**request.GET)
        serializer = AbiturNotBakShortSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def par_bak(self, request):
        queryset = CompGroups.objects.bak(**request.GET)
        serializer = CompGroupsSerializer(queryset, many=True)
        comps = dict.fromkeys(['1', '2', '3', '4'])
        set_of_pr = set()
        for ele in serializer.data:
            set_of_pr.add(ele['priority'])
            if comps[str(ele['priority'])]:
                comps[str(ele['priority'])] += '/' + ele['subject']
            else:
                comps[str(ele['priority'])] = ele['subject']
        if serializer.data:
            keys = OrderedDict({
                'id': '№',
                'code': 'Код',
                'points_all': 'Сумма конкурсных баллов',
            })
            for ele in set_of_pr:
                keys[f'points{ele}'] = comps[str(ele)] if comps[str(ele)] else ''
                keys[f'form_sub{ele}'] = 'Тип',
            keys['points_id'] = 'Индивидуальные достижения'
            keys['advantage'] = 'Преимущественное право'
            keys['doc_type'] = 'Тип документа'
            keys['soglasie'] = 'Наличие согласия'

            try:
                if request.GET['finance'] == 'Бюджетная (целевой прием)':
                    keys['cel_org'] = 'Организация'
            except:
                pass
            return Response(keys)

        return Response({})

    @action(methods=['get'], detail=False)
    def par_spec(self, request):
        queryset = CompGroups.objects.spec(**request.GET)
        serializer = CompGroupsSerializer(queryset, many=True)
        comps = dict.fromkeys(['1', '2', '3', '4'])
        set_of_pr = set()
        for ele in serializer.data:
            set_of_pr.add(ele['priority'])
            if comps[str(ele['priority'])]:
                comps[str(ele['priority'])] += '/' + ele['subject']
            else:
                comps[str(ele['priority'])] = ele['subject']
        if serializer.data:
            keys = OrderedDict({
                'id': '№',
                'code': 'Код',
                'points_all': 'Сумма конкурсных баллов',
            })
            for ele in set_of_pr:
                keys[f'points{ele}'] = comps[str(ele)] if comps[str(ele)] else ''
                keys[f'form_sub{ele}'] = 'Тип',
            keys['points_id'] = 'Индивидуальные достижения'
            keys['advantage'] = 'Преимущественное право'
            keys['doc_type'] = 'Тип документа'
            keys['soglasie'] = 'Наличие согласия'

            try:
                if request.GET['finance'] == 'Бюджетная (целевой прием)':
                    keys['cel_org'] = 'Организация'
            except:
                pass
            return Response(keys)

        return Response({})

    @action(methods=['get'], detail=False)
    def par_mag(self, request):
        queryset = CompGroups.objects.mag(**request.GET)
        serializer = CompGroupsSerializer(queryset, many=True)
        comps = dict.fromkeys(['1', ])
        for ele in serializer.data:
            if comps[str(ele['priority'])]:
                comps[str(ele['priority'])] += '/' + ele['subject']
            else:
                comps[str(ele['priority'])] = ele['subject']
        if serializer.data:
            keys = OrderedDict({
                'id': '№',
                'code': 'Код',
                'points_all': 'Сумма конкурсных баллов',
                'points1': comps['1'] if comps['1'] else '',
                'form_sub1': 'Тип',
                'points_id': 'Индивидуальные достижения',
                'doc_type': 'Тип документа',
                'soglasie': 'Наличие согласия', })
            try:
                if request.GET['finance'] == 'Бюджетная (целевой прием)':
                    keys['cel_org'] = 'Организация'
            except:
                pass
            return Response(keys)
        return Response({})

    @action(methods=['get'], detail=False)
    def par_asp(self, request):
        queryset = CompGroups.objects.asp(**request.GET)
        serializer = CompGroupsSerializer(queryset, many=True)
        comps = dict.fromkeys(['1', '2', '3', '4'])
        for ele in serializer.data:
            if comps[str(ele['priority'])]:
                comps[str(ele['priority'])] += '/' + ele['subject']
            else:
                comps[str(ele['priority'])] = ele['subject']
        if serializer.data:
            keys = OrderedDict({
                'id': '№',
                'code': 'Код',
                'points_all': 'Сумма конкурсных баллов',
                'points1': comps['1'] if comps['1'] else '',
                'form_sub1': 'Тип',
                'points_id': 'Индивидуальные достижения',
                'doc_type': 'Тип документа',
                'soglasie': 'Наличие согласия', })
            try:
                if request.GET['finance'] == 'Бюджетная (целевой прием)':
                    keys['cel_org'] = 'Организация'
            except:
                pass
            return Response(keys)

        return Response({})

    @action(methods=['get'], detail=False)
    def par_bak_short(self, request):
        keys = OrderedDict({
            'id': '№',
            'code': 'Код',
            'points_all': 'Сумма конкурсных баллов',
            'advantage': 'Преимущественное право',
            'doc_type': 'Тип документа',
            'soglasie': 'Наличие согласия', })
        return Response(keys)

    @action(methods=['get'], detail=False)
    def par_spec_short(self, request):
        keys = OrderedDict({
            'id': '№',
            'code': 'Код',
            'points_all': 'Сумма конкурсных баллов',
            'advantage': 'Преимущественное право',
            'doc_type': 'Тип документа',
            'soglasie': 'Наличие согласия', })
        return Response(keys)

    @action(methods=['get'], detail=False)
    def par_mag_short(self, request):
        keys = OrderedDict({
            'id': '№',
            'code': 'Код',
            'points_all': 'Сумма конкурсных баллов',
            'doc_type': 'Тип документа',
            'soglasie': 'Наличие согласия', })
        return Response(keys)

    @action(methods=['get'], detail=False)
    def par_asp_short(self, request):
        keys = OrderedDict({
            'id': '№',
            'code': 'Код',
            'points_all': 'Сумма конкурсных баллов',
            'doc_type': 'Тип документа',
            'soglasie': 'Наличие согласия', })
        return Response(keys)