from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from parts.models import Part
from .serializers import PartSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def partsList(request):
    parts = Part.objects.filter(in_stock__gt=0)

    serializer = PartSerializer(parts, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def partToCart(request, id):
    part = get_object_or_404(Part, id=id)

    print(part.in_stock)

    part.in_stock -= 1
    part.save()

    serializer = PartSerializer(part)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def partOutCart(request, id):
    part = get_object_or_404(Part, id=id)

    print(part.in_stock)

    part.in_stock += 1
    part.save()

    serializer = PartSerializer(part)

    return Response(serializer.data)