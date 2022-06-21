from rest_framework.permissions import IsAdminUser

from utils.permission import IsAdminOrReadOnly
from utils.solomodelview import SoloModelViewSet
from .models import SiteConfiguration, APIConfiguration
from .serializers import SiteConfigurationSerializer, APIConfigurationSerializer


class SiteConfigurationViewSet(SoloModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = SiteConfiguration.objects
    serializer_class = SiteConfigurationSerializer


class APIConfigurationViewSet(SoloModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = APIConfiguration.objects
    serializer_class = APIConfigurationSerializer
