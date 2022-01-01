
from apis.services.base import AbstractServiceClass
from apis.models import WABApps,AppSettings,WABPagesTemplates,WABPages,UsersTable
from apis.utils.web import WebUtil
import logging as log, traceback, sys

class Pages(AbstractServiceClass):
    def save_page(self):
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")
            pageID=WebUtil.getParamValue(self.httpRequest,"pageID",True)
            if len(str(pageID).strip())==0:
                raise ValueError("PageID can't be empty!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})
        retData=[]
        return self.returnResult("Pages fetched!",True,data=retData)   
       
    def get_pages(self):
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})
        retData=[]

        q=list(WABPages.objects.filter(appID=appID))
        for row in q:
            data=self.recordToDict(row,WABPages)
            new_data={}
            for i in data:
                new_data[i]=str(data[i])

            retData.append(new_data)
        return self.returnResult("Pages fetched!",True,data=retData)   
        
    def validate_access(self):
                
        try:
            pageID=WebUtil.getParamValue(self.httpRequest,"pageID",True)
            if len(str(pageID).strip())==0:
                raise ValueError("pageID can't be empty!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})

        # verify also if the sender is also the owner of the app which page is assigned
        q=WABPages.objects.filter(id=pageID)
        first_q=q.first()
        owner=self.getUserID()
        q_apps=WABApps.objects.filter(id=str(first_q.appID),owner=owner)

        if q.count()>0 and q_apps.count()>0:
            return self.returnResult("Validate Page access",True,data={"access_guard":"true"})
        return self.returnResult("Validate Page access",True,data={"access_guard":"false"})





    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["get_pages","validate_access"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return False  