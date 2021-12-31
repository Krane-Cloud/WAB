
from apis.services.base import AbstractServiceClass
from apis.models import WABApps,AppSettings,WABPagesTemplates,WABPages,UsersTable
from apis.utils.web import WebUtil
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
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})
        

        wab_version=AppSettings.objects.filter(name="VERSION").first()

        instance=WABApps()
        instance.name=name
        instance.owner=owner
        instance.wab_version=wab_version.value
        instance.available=False
        instance.save()

        appID=str(instance.id).replace("-","")

        self.generateScrach(appID)
 
        return self.returnResult("Application added with success!",True,data={"application":{
            "id":appID,
            "name":name,
            "owner":owner,
            "wab_version":wab_version.value
        }})


    def validateAppName(self,name:str,owner:str):
        q=WABApps.objects.filter(name=name,owner=owner)
        if q.count()>0:
            return True
        return False

    
    def generateScrach(self,appID:str):
        
        try:

            scrachTemplate=WABPagesTemplates.objects.filter(id=0).first()#.values("html_content","js_content")
                
            page_instance=WABPages()
            page_instance.name="Scrach Application Build"
            page_instance.appID=appID
            page_instance.appPageID=0
            page_instance.html_content=scrachTemplate.html_content
            page_instance.js_content=scrachTemplate.js_content
            page_instance.save()

            # make Application available
            appInstance=WABApps.objects.get(id=appID)
            appInstance.available=True
            appInstance.save()
        except Exception as err:
            log.info(err)
            traceback.print_exc(file=sys.stdout)


    def get_apps(self):
        appID=WebUtil.getParamValue(self.httpRequest,"appID",False)
        owner=self.getUserID()
        retData=[]
        if appID:
            q=list(WABApps.objects.filter(id=appID,owner=owner))
        else:
            q=list(WABApps.objects.filter(owner=owner))

        for row in q:
            data=self.recordToDict(row,WABApps)
            data["username"]=self.getUserName(data["owner"])
            retData.append(data)
        
        return self.returnResult("Applications fetched!",True,data=retData)   

    def getUserName(self,userID:str)->str:
        q=UsersTable.objects.filter(id=userID).first()
        return str(q.username)


    def remove_app(self):
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            if len(str(appID).strip())==0:
                raise ValueError("Parameter appID can't be empty.")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})

        owner=self.getUserID()
        instance=WABApps.objects.get(pk=appID,owner=owner)
        has_been_deleted=False
        try:
            instance.delete()
            has_been_deleted=True
        except Exception as err:
            return self.returnResult("An error has occured while trying to delete the application.",False,errors={"validation_error":str(err)})
        
        if has_been_deleted:
            try:
                instance=WABPages.objects.get(appID=appID)
                instance.delete()
            except Exception as err:
                print(err)
            return self.returnResult("Delete was finished with no errors.",True)            
        else:
            return self.returnResult("Delete was finished with errors.",False)


    def edit_appbase(self):

        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            app_name=WebUtil.getParamValue(self.httpRequest,"appName",True)
            if len(str(appID).strip())==0:
                raise ValueError("appID can't be empty!")
            if len(str(app_name).strip())==0:
                raise ValueError("AppName can't be empty!")

        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})

        owner=self.getUserID()

        try:
            instance=WABApps.objects.get(pk=appID,owner=owner)
        except Exception:
            return self.returnResult("A validation error has occured!.",False,errors={"validation_error":"An application with the provided ID doesn't exists!"})
        instance.name=app_name
        instance.update()

        new_data={}
        new_data["appID"]=appID
        new_data["appName"]=app_name


        return self.returnResult("Application edited with success!.",True,data=new_data)

    def validate_access(self):
        
        try:
            appID=WebUtil.getParamValue(self.httpRequest,"appID",True)
            if len(str(appID).strip())==0:
                raise ValueError("AppID can't be empty!")
        except Exception as err:
            return self.returnResult("A validation error has occured.",False,errors={"validation_error":str(err)})

        q=WABApps.objects.filter(id=appID)
        if q.count()>0:
            return self.returnResult("Validate access",True,data={"access_guard":"true"})
        return self.returnResult("Validate access",True,data={"access_guard":"false"})




    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["add_app","get_apps","remove_app","edit_appbase","validate_access"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return False  