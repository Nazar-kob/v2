from django.urls import path
from .views import VmListView, VmDetailView, ServerListView, VmSshKeyView, VmSshKeyDeleteView


from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="My API",
        default_version='v1',
        description="CRUD operations for VMs and RC for servers",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('vms/', VmListView.as_view(), name='vm-create'),
    path('vms/<int:pk>/', VmDetailView.as_view(), name='vm-detail'),
    path('vms/<int:vm_id>/ssh-keys/', VmSshKeyView.as_view(), name='vm-ssh-keys'),
    path('vms/<int:vm_id>/ssh-keys/<int:ssh_key_id>/', VmSshKeyDeleteView.as_view(), name='vm-ssh-keys-delete'),
    path('servers/', ServerListView.as_view(), name='server-list'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]