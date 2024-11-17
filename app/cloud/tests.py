from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import SshKey, Vm, Server

class VmDetailViewTests(APITestCase):
    
    def setUp(self):
        self.server = Server.objects.create(name="Test Server", region="US-East")
        
        self.vm = Vm.objects.create(
            name="Test VM",
            cpus=2,
            ram=8,
            server=self.server,
            active=True
        )
        
        self.client = APIClient()
        
        
    def test_get_vms(self):
        response = self.client.get('/api/vms/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
    def test_create_vm(self):
        data = {
            "name": "New VM",
            "cpus": 4,
            "ram": 16,
            "server_id": self.server.pk
        }
        response = self.client.post('/api/vms/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Vm.objects.count(), 2)
        
        
    def test_get_vm_detail(self):
        response = self.client.get(f'/api/vms/{self.vm.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.vm.id)
        self.assertEqual(response.data['name'], self.vm.name)
        self.assertEqual(response.data['server'], self.server.name)
        
    def test_get_nonexistent_vm(self):
        response = self.client.get('/api/vms/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['details'], "Vm not found")
        
    def test_update_vm_detail(self):
        data = {
            "name": "Updated VM",
            "cpus": 4,
            "ram": 16
        }
        response = self.client.put(f'/api/vms/{self.vm.pk}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.vm.refresh_from_db()
        self.assertEqual(self.vm.name, "Updated VM")
        self.assertEqual(self.vm.cpus, 4)
        self.assertEqual(self.vm.ram, 16)
        
    
    def test_delete_vm(self):
        response = self.client.delete(f'/api/vms/{self.vm.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.vm.refresh_from_db()
        self.assertTrue(self.vm.is_deleted)



class ServiceTests(APITestCase):
    
    def setUp(self):
        self.server = Server.objects.create(name="Test Server", region="US-East")
        self.client = APIClient()
        
        
    def test_create_server(self):
        data = {
            "name": "Test Server",
            "region": "US-East"
        }
        response = self.client.post('/api/servers/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Server.objects.count(), 2)
        
    def test_get_servers(self):
        response = self.client.get('/api/servers/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
        
class TestSshKey(APITestCase):
    def setUp(self):
        # Create a sample server
        self.server = Server.objects.create(name="Test Server", region="US-East")
        
        # Create a sample VM
        self.vm = Vm.objects.create(
            name="Test VM",
            cpus=2,
            ram=8,
            server=self.server,
            active=True
        )
        
        self.ssh_key = SshKey.objects.create(
            name="Test Key",
            public_key="ssh-rsa dsfsfsfsdfsf"
        )
        self.ssh_key.vms.add(self.vm)
        # API client
        self.client = APIClient()
        
        
    def test_create_ssh_key(self):
        """Test creating a SSH key."""
        data = {
            "name": "Test Key",
            "public_key": "ssh-rsa dsfsfsfsdfsf"
        }
        response = self.client.post(f'/api/vms/{self.vm.pk}/ssh-keys/', data)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SshKey.objects.count(), 2)
        
    def test_get_ssh_keys(self):
        """Test getting SSH keys for a VM."""
        response = self.client.get(f'/api/vms/{self.vm.pk}/ssh-keys/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
    def test_delete_ssh_key(self):
        """Test deleting a SSH key."""
        response = self.client.delete(f'/api/vms/{self.vm.pk}/ssh-keys/{self.ssh_key.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(SshKey.objects.count(), 0)
        


