from django.contrib import admin

from .models import Server, Vm, SshKey

admin.site.register(Server)
admin.site.register(Vm)
admin.site.register(SshKey)
