from apis.utils.web import WebUtil
from apis.services.base import AbstractAuthClass
# from django.contrib.auth import authenticate as auth, login as llogin, logout as llogout
users_default_data=["email","username","first_name","last_name","is_staff","is_superuser","date_joined"]
import json

class Users(AbstractAuthClass):
    def get(self):
        data={}
        if self.httpRequest.user.is_authenticated and self.httpRequest.user.is_active:
            user=self.httpRequest.user
            for field in users_default_data:
                data[field]=str(getattr(user,field))


        return {"message":"Users data has been extracted!","status":"OK","data":data},200    
        
        

    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["get"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return False 
