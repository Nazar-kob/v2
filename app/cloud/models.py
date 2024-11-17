from django.db import models


class Server(models.Model):
	name = models.TextField()
	region = models.TextField()
 
 
	def __str__(self):
		return self.name

	class Meta:
		managed = False

class Vm(models.Model):
	name = models.TextField()
	cpus = models.IntegerField(default=1)
	ram = models.IntegerField(default=4)
	server = models.ForeignKey(Server, null=True, on_delete=models.SET_NULL)
	active = models.BooleanField(default=True)
	is_deleted = models.BooleanField(default=False)
	create_date = models.DateTimeField(auto_now_add=True)
	update_date = models.DateTimeField(auto_now=True)
 
 
	def __str__(self):
		return self.name	
 
 
 
	@property
	def server_name(self):
		return self.server.name

class SshKey(models.Model):
	name = models.TextField()
	public_key = models.TextField()
	vms = models.ManyToManyField(Vm, related_name='ssh_keys')
 
 
	def __str__(self):
		return self.name