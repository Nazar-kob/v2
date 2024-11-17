from django.urls import path
from .views import VmListView, VmDetailView

urlpatterns = [
    path('vms/', VmListView.as_view(), name='vm-create'),
    path('vms/<int:pk>/', VmDetailView.as_view(), name='vm-detail'),
]