from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView

from back_end.settings import DEBUG

urlpatterns = [
    path('admin/', admin.site.urls),
    path('yandex_f2818ada647d27c8.html/', TemplateView.as_view(template_name='yandex_f2818ada647d27c8.html')),
    path('api/', include([
        path('v1/', include('api.v1.urls'), name='v1')
    ]), name='api'),

]
if DEBUG:
    urlpatterns += [
        re_path(r'',
                ensure_csrf_cookie(TemplateView.as_view(template_name='build/index.html')),
                name='index',
                )]
