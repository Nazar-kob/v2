
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import SshKey, Vm, Server
from .serializers import VmCreateSerializer, VmSerializer, VmDetailSerializer, ServerSerializer, SshKeySerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.exceptions import MethodNotAllowed



from rest_framework import status
from rest_framework.response import Response



class ServerListView(generics.ListCreateAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    

class VmListView(APIView):

    def get(self, request, *args, **kwargs):
        vms = Vm.objects.filter(is_deleted=False).prefetch_related('server')
        serializer =  VmSerializer(vms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = VmCreateSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        server = Server.objects.get(pk=serializer.validated_data['server_id'])
        
        if not server:
            return Response({"details": "Server not found"}, status=status.HTTP_404_NOT_FOUND)
        
        Vm.objects.create(server=server, **serializer.validated_data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class VmDetailView(APIView):
    
    def get_object(self, pk):
        try:
            return Vm.objects.get(pk=pk)
        except Vm.DoesNotExist:
            return None

    def get(self, request, pk, *args, **kwargs):
        vm = self.get_object(pk)
        
        if not vm:
            return Response({"details": "Vm not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer =  VmDetailSerializer(vm, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwargs):
        vm = self.get_object(pk)

        if not vm:
            return Response({"details": "Vm not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = VmDetailSerializer(vm, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs):
        vm = self.get_object(pk)
        if not vm:
            return Response(
                {"details": "Vm not found!"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        vm.is_deleted = True
        vm.save()
        return Response(
            {"details": "Vm deleted!"},
            status=status.HTTP_200_OK
        )


class VmSshKeyView(APIView):
    
    def get(self, request, vm_id, *args, **kwargs):
        try:
            vm = Vm.objects.prefetch_related('ssh_keys').get(pk=vm_id)
        except Vm.DoesNotExist:
            return Response({"details": "Vm not found"}, status=status.HTTP_404_NOT_FOUND)

        ssh_keys = vm.ssh_keys.all()
        serializer = SshKeySerializer(ssh_keys, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, vm_id, *args, **kwargs):
        try:
            vm = Vm.objects.get(pk=vm_id)
        except Vm.DoesNotExist:
            return Response({"details": "Vm not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SshKeySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        ssh_key = serializer.save() 
        vm.ssh_keys.add(ssh_key) 

        return Response(SshKeySerializer(ssh_key).data, status=status.HTTP_201_CREATED)

class VmSshKeyDeleteView(APIView):
    def delete(self, request, vm_id, ssh_key_id, *args, **kwargs):

        try:
            ssh_key = SshKey.objects.filter(vms__id=vm_id).get(pk=ssh_key_id)
        except SshKey.DoesNotExist:
            return Response({"details": "SSH Key not found"}, status=status.HTTP_404_NOT_FOUND)
        
        ssh_key.delete()
        
        return Response(
            {"details": "success"},
            status=status.HTTP_200_OK
        )