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
        return obj.item_type.name
    
    def get_item_name(self, obj):
        return obj.item.name
    
    def get_item_is_sold(self, obj):
        try:
            if obj.item_type.name == 'car':
                if obj.item.id == obj.item.sellcar_set.first().car.id:
                    return True
                else:
                    return False
        except:
            return False