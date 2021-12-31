
from apis.utils.web import WebUtil
from apis.services.base import AbstractAuthClass
from django.contrib.auth import authenticate as auth, login as llogin, logout as llogout

class Primary(AbstractAuthClass):
    def login(self):  
        username = WebUtil.getParamValue(self.httpRequest, 'username', True)
        password = WebUtil.getParamValue(self.httpRequest, 'password', True)
        
        if not username or not password:
            return {"message": "No credentials provided", "status": "NOK"},400
        user = auth(self.httpRequest, username=username, password=password)
        if user is None:
            return {"message": "Credentials are missing or wrong!", "status": "NOK"},400
        if not user.is_active:
            return {"message": "User is inactive or deleted!", "status": "NOK"},400
        llogin(self.httpRequest, user)
        return {"message": "You have been authenticated with success!", "status": "OK", "data": {"user": user.get_username()}},200

    def logout(self):
        if self.httpRequest.user.is_authenticated:
            llogout(self.httpRequest)
            return {"message": "You have been logged out with success!", "status": "OK"},200
        return {"message": "You are already logged out!", "status": "NOK"}, 400

    def validate_connection(self):
        return {"message": "Backend is running!", "status": "OK"}, 200


    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["login","logout","validate_connection"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return True # put to False if you want to force the API call to be executed as a logged in user