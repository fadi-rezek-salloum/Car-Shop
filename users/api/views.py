from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomerSerialier
from users.models import Customer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.first_name + ' ' + user.last_name
        
        if user.is_staff:
            token['role'] = 'admin'
        else:
            token['role'] = 'normal'
            
        return token


class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer


class RegisterUser(APIView):

    def post(self, request):

        serializer = CustomerSerialier(data=request.data)

        try:
            Customer.objects.get(email=request.data.get('email'))
            return Response('Email already exists!', status=status.HTTP_409_CONFLICT)
        except:
            pass

        if serializer.is_valid():
            user = serializer.save()

            user.set_password(request.data.get('password'))

            user.save()

            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)