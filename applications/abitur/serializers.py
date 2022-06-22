from rest_framework import serializers

from .models import Abitur, CompGroups


class AbiturSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = ('doc_type', 'soglasie',)


class AbiturBakShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = ('code', 'points_all', 'advantage', 'doc_type', 'soglasie')


class AbiturNotBakShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = ('code', 'points_all', 'doc_type', 'soglasie')


class AbiturBakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = (
            'code', 'points_all', 'points1', 'form_sub1', 'points2', 'form_sub2', 'points3', 'form_sub3', 'points4',
            'form_sub4', 'points_id', 'advantage', 'doc_type', 'soglasie'
        )


class AbiturBakOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = (
            'code', 'points_all', 'points1', 'form_sub1', 'points2', 'form_sub2', 'points3', 'form_sub3', 'points4',
            'form_sub4', 'points_id', 'advantage', 'doc_type', 'soglasie', 'cel_org'
        )


class AbiturNotBakOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = ('code', 'points_all', 'points1', 'form_sub1', 'points_id', 'doc_type', 'soglasie', 'cel_org')


class AbiturNotBakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abitur
        fields = ('code', 'points_all', 'points1', 'form_sub1', 'points_id', 'doc_type', 'soglasie')


class CompGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompGroups
        fields = ('subject', 'priority')


class CompGroupsExtendSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompGroups
        fields = '__all__'