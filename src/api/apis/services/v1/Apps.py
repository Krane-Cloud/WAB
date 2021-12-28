
from apis.services.base import AbstractServiceClass
from apis.models import WABApps,AppSettings,WABPagesTemplates,WABPages
from apis.utils.web import WebUtil
import threading
import logging as log, traceback, sys

supported_apps=["EMPTY"]

class Apps(AbstractServiceClass):
    def add_app(self):
        try:
            name=WebUtil.getParamValue(self.httpRequest,"name",True)
            type_of_app=WebUtil.getParamValue(self.httpRequest,"type_of_app",True)
            owner=self.getUserID()

            if len(name)==0:
                raise ValueError("Name can't be empty!")
            if self.validateAppName(name,owner):
                raise ValueError(f"The application name {name}, already exists!")
            
            if type_of_app not in supported_apps:
                raise ValueError(f"The entered type of app {type_of_app} is not supported yet. :(")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":err})
        

        wab_version=AppSettings.objects.filter(name="VERSION").first()

        instance=WABApps()
        instance.name=name
        instance.owner=owner
        instance.wab_version=wab_version
        instance.available=False
        instance.save()

        appID=str(instance.id).replace("-","")

        asyncRun=threading.Thread(target=self.generateScrach,args=(appID))
        asyncRun.start()


        return self.returnResult("Application added with success!",True,data={"application":{
            "id":appID,
            "name":name,
            "owner":owner,
            "wab_version":wab_version
        }})


    def validateAppName(self,name:str,owner:str):
        q=WABApps.objects.filter(name=name,owner=owner)
        if q.count()>0:
            return True
        return False


    def generateScrach(self,appID:str):
        
        try:

            scrachTemplate=WABPagesTemplates.objects.filter(id=0).values("html_content","js_content")
                
            page_instance=WABPages()
            page_instance.name="Scrach Application Build"
            page_instance.appID=appID
            page_instance.appPageID=0
            page_instance.html_content=scrachTemplate['html_content']
            page_instance.js_content=scrachTemplate['js_content']
            page_instance.save()

            # make Application available
            appInstance=WABApps.objects.get(id=appID)
            appInstance.available=True
            appInstance.save()
        except Exception as err:
            log.info(err)
            traceback.print_exc(file=sys.stdout)



    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["add_app"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return False # put to False if you want to force the API call to be executed as a logged in user