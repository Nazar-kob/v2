import json

from django.views.generic import TemplateView

# Create your views here.
class IndexView(TemplateView):
	template_name = "home/index.html"
 
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		# test data another way to pass data to the frontend
		context["json"] =  json.dumps({"users": [{ "name": "John", "age": 30 }, { "name": "Jane", "age": 25 }]} )

		return context
