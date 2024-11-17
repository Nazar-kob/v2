from rest_framework import serializers
from .models import Vm, SshKey, Server


        

class VmSerializer(serializers.ModelSerializer):
    
    server_name = serializers.ReadOnlyField()
    class Meta:
        model = Vm
        fields = ('id', 'name', 'cpus', 'ram', 'active', 'server_name')
        
        
class VmCreateSerializer(serializers.ModelSerializer):
    
    server_id = serializers.IntegerField()
    
    
    class Meta:
        model = Vm
        fields = ('name', 'cpus', 'ram', 'server_id')
        
    
    
        
        
class SshKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = SshKey
        fields = ('id', 'name') 


class VmDetailSerializer(serializers.ModelSerializer):
    
    ssh_keys = SshKeySerializer(
        many=True,
    )
    
    server = serializers.CharField(source='server.name')
    
    class Meta:
        model = Vm
        fields = ('id', 'name', 'cpus', 'ram', 'server', 'active',  'create_date', 'ssh_keys' )
        