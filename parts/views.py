import os
from django.conf import settings

from django.http import JsonResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from parts.models import Part
from .serializers import PartSerializer
from .utils import read_dataset, transaction_rule


def get_all_countries(request):
    values = Part.objects.values_list('country', flat=True).distinct()
    return JsonResponse({'countries': list(values)})


def get_all_brands(request):
    values = Part.objects.values_list('name', flat=True).distinct()
    return JsonResponse({'brands': list(values)})


def associate_parts(request, id):
    part = Part.objects.get(id=id)

    df = read_dataset(os.path.join(settings.STATIC_ROOT, 'datasets', 'parts-transactions.csv'))

    related_products = transaction_rule(df, [part.name_ar])

    query = Q()
    for name in related_products:
        query |= Q(name_ar__icontains=name)

    parts = Part.objects.filter(query)

    serializer = PartSerializer(parts, many=True)

    return JsonResponse({'parts': serializer.data})

@api_view(['GET'])
@permission_classes([AllowAny])
def partsList(request):
    brand = request.query_params.get('brand', None)
    country = request.query_params.get('country', None)

    parts = Part.objects.filter(in_stock__gt=0)

    if brand:
        parts = parts.filter(name=brand)
    if country:
        parts = parts.filter(country=country)

    serializer = PartSerializer(parts, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def partToCart(request, id):
    part = get_object_or_404(Part, id=id)

    part.in_stock -= 1
    part.save()

    serializer = PartSerializer(part)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def partOutCart(request, id):
    part = get_object_or_404(Part, id=id)

    part.in_stock += 1
    part.save()

    serializer = PartSerializer(part)

    return Response(serializer.data)