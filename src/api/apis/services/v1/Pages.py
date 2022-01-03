
from django.core.checks import messages
from apis.services.base import AbstractServiceClass
from apis.models import WABApps,AppSettings,WABPagesTemplates,WABPages,UsersTable
from apis.utils.web import WebUtil
import logging as log, traceback, sys

class Pages(AbstractServiceClass):
    def save_page(self):
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            pageID=WebUtil.getParamValue(self.httpRequest,"pageID",True)
            htmlCode=WebUtil.getParamValue(self.httpRequest,"htmlCode",False)
            jsCode=WebUtil.getParamValue(self.httpRequest,"jsCode",False)
            # particular validations
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")
            if len(str(pageID).strip())==0:
                raise ValueError("PageID can't be empty!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})


        instance=WABPages.objects.get(appID=appID)

        instance.html_content=str(htmlCode)
        instance.js_content=str(jsCode)
        message="Pages fetched!"
        status=True
        try:
            instance.save()
        except Exception as err:
            message="Unable to save"
            status=False
            

        retData={"appID":appID,"pageID":pageID,"htmlCode":htmlCode,"jsCode":htmlCode}
        return self.returnResult(message,status,data=retData)   
       
    def get_pages(self):
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")
            pre_q=WABPages.objects.filter(appID=appID)
            db_app_id=str(pre_q.first().appID)
            if str(db_app_id)!=str(appID):
                raise PermissionError("Permission insuficent to get this content!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})
        retData=[]

        q=list(pre_q)
        for row in q:
            data=self.recordToDict(row,WABPages)
            new_data={}
            for i in data:
                new_data[i]=str(data[i])

            retData.append(new_data)
        return self.returnResult("Pages fetched!",True,data=retData)   
        
    def validate_access(self):
                
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            pageID=WebUtil.getParamValue(self.httpRequest,"pageID",True)
            if len(str(pageID).strip())==0:
                raise ValueError("PageID can't be empty!")
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})
        return self.make_access_validation(appID,pageID)
        


    def make_access_validation(self,appID:str,pageID:str):
        # verify also if the sender is also the owner of the app which page is assigned
        q=WABPages.objects.filter(id=pageID)
        owner=self.getUserID()
        q_apps=WABApps.objects.filter(id=appID,owner=owner)
        if q.count()>0 and q_apps.count()>0:
            return self.returnResult("Validate Page access",True,data={"access_guard":"true"})
        return self.returnResult("Validate Page access",True,data={"access_guard":"false"})
            


    def get_page_details(self):
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            pageID=WebUtil.getParamValue(self.httpRequest,"pageID",True)

            if len(str(pageID).strip())==0:
                raise ValueError("PageID can't be empty!")
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")

            valid=self.make_access_validation(appID,pageID)
            if valid[0]["data"]["access_guard"]=="false":
                raise PermissionError("You are not allowed to get this page!")

        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})

        q=WABPages.objects.filter(appID=appID,id=pageID).first()

        # htmlCode=WebUtil.convertBytesContent2Str(q.html_content)
        # jsCode=WebUtil.convertBytesContent2Str(q.js_content)
        htmlCode=q.html_content
        jsCode=q.js_content

        retData={"appID":appID,"pageID":pageID,"htmlCode":htmlCode,"jsCode":jsCode}
        return self.returnResult("Page fetched!",True,data=retData)   

    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["get_pages","validate_access","save_page","get_page_details"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return False  