from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import GenericViewSet


class SoloModelViewSet(GenericViewSet):
    def list(self, request):
        queryset = self.__class__.queryset.get(pk=1)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def patch(self, request):
        queryset = self.__class__.queryset.get(pk=1)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_204_NO_CONTENT)

        return Response(status=HTTP_400_BAD_REQUEST)
