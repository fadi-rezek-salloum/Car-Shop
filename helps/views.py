from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from helps.models import Help
from users.models import Customer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def helpRequest(request):
    data = request.data

    user = Customer.objects.get(id=data['user_id'])

    help = Help.objects.create(user=user, lng=data['lng'], lat=data['lat'])

    help.save()

    return Response('ok')