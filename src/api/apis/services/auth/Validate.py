
from apis.utils.web import WebUtil
from apis.services.base import AbstractAuthClass
from django.contrib.auth import authenticate as auth, login as llogin, logout as llogout

class Validate(AbstractAuthClass):
    def is_auth(self):
        if self.httpRequest.user.is_authenticated:
            return self.returnResult(f"User is authenticated",True,data={"authenticated":"true"})
        return self.returnResult(f"User is not authenticated",True,data={"authenticated":"false"})

    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["is_auth"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return True 
