from django.urls import path, include
from rest_framework.authentication import SessionAuthentication
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

from applications.config.api import SiteConfigurationViewSet
from applications.config.models import APIConfiguration
from applications.events.api import IntramuralEventViewSet, ExtramuralEventViewSet
from applications.trends.api import ExamViewSet, TrendViewSet
from utils.wrappermap import WrapperMap

try:
    API_CONFIGURATION = APIConfiguration.get_solo()
except:
    API_CONFIGURATION = WrapperMap({
        'API_TITLE': 'API_TITLE',
        'API_DESCRIPTION': 'API_DESCRIPTION',
    })
router = DefaultRouter()
router.register(r'config',
                SiteConfigurationViewSet,
                'config')
router.register(r'abitur',
                AbiturViewSet,
                'abitur')
router.register(r'exam',
                ExamViewSet,
                'exam')
router.register(r'trend',
                TrendViewSet,
                'trend')
router.register(r'in-event',
                IntramuralEventViewSet,
                'in-event')
router.register(r'ex-event',
                ExtramuralEventViewSet,
                'ex-event')
urlpatterns = router.urls
urlpatterns += [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('schema/', get_schema_view(title=API_CONFIGURATION.API_TITLE.__str__(),
                                    description=API_CONFIGURATION.API_DESCRIPTION.__str__(),
                                    version='1.0',

                                    )
         ),
    path('docs/', include_docs_urls(title=API_CONFIGURATION.API_TITLE.__str__(),
                                    description=API_CONFIGURATION.API_DESCRIPTION.__str__(),
                                    authentication_classes=[SessionAuthentication]),
         name='docs',
         ),
]
