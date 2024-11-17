
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Vm, Server
from .serializers import VmCreateSerializer, VmSerializer, VmDetailSerializer
from rest_framework.response import Response
from rest_framework.views import APIView



from rest_framework import status
from rest_framework.response import Response


    
class VmListView(APIView):

    def get(self, request, *args, **kwargs):
        vms = Vm.objects.filter(is_deleted=False)
        serializer =  VmSerializer(vms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = VmCreateSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        server = Server.objects.get(pk=serializer.validated_data['server_id'])
        
        if not server:
            return Response({"error": "Server not found"}, status=status.HTTP_400_BAD_REQUEST)
        
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
            return Response({"error": "Vm not found"}, status=status.HTTP_400_BAD_REQUEST)

        serializer =  VmDetailSerializer(vm, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwargs):
        vm =  self.get_object(pk)
        
        if not vm:
            return Response({"error": "Vm not found"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = VmCreateSerializer(vm, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"message": "succes"}, status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs):
        vm = self.get_object(pk)
        if not vm:
            return Response(
                {"res": "Vm not found!"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        vm.is_deleted = True
        vm.save()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )


