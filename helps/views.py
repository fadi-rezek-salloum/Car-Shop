import stripe

from django.shortcuts import redirect
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

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


stripe.api_key = settings.STRIPE_SECRET_KEY

@method_decorator(csrf_exempt, name='dispatch')
class StripeCheckoutSession(APIView):
    def post(self, request, *args, **kwargs):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        "price": "price_1NJoADDgiV2TrUeeMaaMxayr",
                        "quantity": 1,
                    }
                ],
                payment_method_types = ["card",],
                mode = "payment",
                success_url = settings.SITE_URL + "/request-help/" + "?success=true&session_id={CHECKOUT_SESSION_ID}",
                cancel_url = settings.SITE_URL + "/request-help/" + "?canceled=true"
            )

            return redirect(checkout_session.url, code=303)
        
        except Exception as ex:
            print(ex)
            return Response({'msg':'something went wrong while creating stripe session','error':str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)