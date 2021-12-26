

from django.conf.urls import include
from django.urls import path

from .controllers import ServiceController


urlpatterns = [
     path("<pkg>/<service>/<action>",ServiceController.index)
    
]
