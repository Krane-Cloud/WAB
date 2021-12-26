
from apis.services.base import AbstractServiceClass


class Example(AbstractServiceClass):
    def show(self):
        return self.returnResult("Here's an example of a API call.",True,data={"data1":"ExampleReturn1","data2":"ExampleReturn2"})


    """Security Methods"""
    def allowedHTTPMethods(self): return ['GET', 'POST']
    def allowedServices(self): return ["show"]
    def isAllowedAccess(self): return True
    def isAllowedAnonymmus(self): return True # put to False if you want to force the API call to be executed as a logged in user