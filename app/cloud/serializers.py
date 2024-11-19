from rest_framework import serializers
from .models import Vm, SshKey, Server


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ('id', 'name', "region")


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
        fields = ('id', 'name', 'public_key') 


class VmDetailSerializer(serializers.ModelSerializer):
    
    
    server_id = serializers.IntegerField()
    
    class Meta:
        model = Vm
        fields = ('id', 'name', 'cpus', 'ram', 'active', 'server_id')
        
        
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.ram = validated_data.get('ram', instance.ram)
        instance.cpus = validated_data.get('cpus', instance.cpus)
        instance.active = validated_data.get('active', instance.active)
        server = Server.objects.get(pk=validated_data['server_id'])
        if not server:
            raise serializers.ValidationError("Server not found")
        
        instance.server = Server.objects.get(pk=validated_data['server_id'])
        
        instance.save()
        return instance
        