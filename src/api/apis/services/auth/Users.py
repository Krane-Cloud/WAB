from apis.utils.web import WebUtil
from apis.services.base import AbstractAuthClass
# from django.contrib.auth import authenticate as auth, login as llogin, logout as llogout
users_default_data=["email","username","first_name","last_name","is_staff","is_superuser","date_joined"]
from apis.models import UsersTable



class Users(AbstractAuthClass):
    def get(self):
        data={}
        if self.httpRequest.user.is_active:
            user=self.httpRequest.user
            for field in users_default_data:
                data[field]=str(getattr(user,field))
        message="Users data has been extracted!"
        if len(data)==0:
            message="User is disabled!"

        return {"message":message,"status":"OK","data":data},200    
        
    def get_username(self):
        try:
            userID=WebUtil.getParamValue(self.httpRequest,"userID",True)
            if str(userID).strip()==0:
                raise ValueError("The userID parameter is mandatory!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})

        q=UsersTable.objects.filter(id=userID).first()
        data={
            "username":q.username
        }
        return {"message":"User returned!","status":"OK","data":data},200    
        

    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["get","get_username"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return False 
