from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from users.models import Customer
from bill.models import Bill
from parts.models import Part

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def billCheckout(request):
    data = request.data

    user = Customer.objects.get(id=data['user'])

    bill = Bill.objects.create(user=user, notes=data['notes'], total_price=data['total_price'])
    bill.save()

    for item in data['cartItems']:
        part = Part.objects.get(id=item['id'])
        part.in_stock -= item['qty']
        part.save()

        bill.part.add(part)
        bill.save()
    
    return Response('ok')