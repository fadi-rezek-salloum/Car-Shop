from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import History


class HistorySerializer(ModelSerializer):
    item_type = SerializerMethodField()
    item_name = SerializerMethodField()
    item_is_sold = SerializerMethodField()


    class Meta:
        model = History
        fields = '__all__'

    def get_item_type(self, obj):
        if obj.car is not None:
            return 'car'
        else:
            return 'part' 
    
    def get_item_name(self, obj):
        if obj.car is not None:
            return obj.car.name
        else:
            return obj.part.name
    
    def get_item_is_sold(self, obj):
        try:
            if obj.car is not None:
                if obj.car.id == obj.car.sellcar_set.first().car.id:
                    return True
                else:
                    return False
        except:
            return False