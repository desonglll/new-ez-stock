from django.http import JsonResponse
from rest_framework import generics
from api.models import Result
from .serializers import NewsSerializer
from .models import News


def get_all_news(request):
    data = News.objects.all()
    serializer = NewsSerializer(data, many=True)
    result = Result(status="success", message="Get all news", data=serializer.data)
    return JsonResponse(result.to_json(), status=200)


def get_news_by_pk(request, pk):
    data = News.objects.get(pk=pk)
    serializer = NewsSerializer(data, many=False)
    result = Result(status="success", message="Get news", data=serializer.data)
    return JsonResponse(result.to_json(), status=200)


class NewsListCreateAPIView(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


news_list_create_view = NewsListCreateAPIView.as_view()
