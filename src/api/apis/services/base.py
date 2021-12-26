from typing import Dict, List, Union
from django.db.models import query
# import logging as log, traceback, sys


class AbstractServiceClass:

    def __init__(self, httpRequest) -> None:
        self.httpRequest = httpRequest

    """
    #####################
    Relevant Functions
    #####################
    """

    def getEntityClass(self):
        raise NotImplementedError("Class hasn't been defined yet!")

    def collectHttpPostData(self):
        p = {}
        for i in self.httpRequest.POST.keys():
            p[i] = self.httpRequest.POST[i]
        return p

    def collectHttpGetData(self):
        p = {}
        for i in self.httpRequest.GET.keys():
            p[i] = self.httpRequest.GET[i]
        return p

    """
    #####################
         Security 
    #####################
    """

    def allowedHTTPMethods(self):
        return ['GET', 'POST']

    def allowedServices(self):
        return []

    def isAllowedAccess(self):
        return False

    def isAllowedAnonymmus(self):
        return False

    def validateSecurity(self):
        msg = ""
        code = 0
        if not self.isAllowedAccess():
            msg = "The service is disabled!"
            code = 423
        elif not self.httpRequest.user.is_authenticated and not self.isAllowedAnonymmus(
        ):
            msg = "You need to be authenticated in order to access this service!"
            code = 403
        return msg, code

    def securityMgm(self):
        validMsg, code = self.validateSecurity()
        if code > 0:
            return {'message': validMsg}, code
        # data = self.collectHttpPostData()
        return "", 0

    """
    #####################
            MISC
    #####################
    """

    def getUserID(self):
        currentUser = self.httpRequest.user
        return str(currentUser.id).replace('-', '')

    def recordToDict(self, rec, recClass):
        res = {}
        for field in recClass._meta.get_fields():
            fname = field.attname
            res[fname] = getattr(rec, fname)
        return res

    def returnResult(self, message: str, status: bool, data: dict|list|None=None,
                     errors: dict|None=None):
        """
        Method for simplyfing the returns of a API call.
        Status:
        - If true-> will return a 200 
        - Else -> will returnd a 400
        """
        if not status:
            return {"message": message, "status": "NOK", "errors": errors}, 400
        return {"message": message, "status": "OK", "data": data}, 200


class AbstractDataRetrive(AbstractServiceClass):
    """
    ############################
       Main Query Functions
    ############################
    """

    def query(self):
        data, code = self.securityMgm()
        if code > 0:
            return data, code

        try:
            ec = self.getEntityClass()
            self.preQuery(ec)
            data, code = self.onQuery(ec)
            self.postQuery(ec)
            return data, code
        except Exception as err:
            return {
                'message': 'ERROR',
                'error': str(err),
                'status': 'INVALID'
            }, 500

    def preQuery(self, ec):
        pass

    def onQuery(self, ec):
        params = self.collectHttpGetData()
        query = list(ec.objects.filter(**params))
        res = []
        for e in query:
            d = self.recordToDict(e, ec)
            res.append(d)
        return {'message': 'SUCCESS', 'data': res}, 200

    def postQuery(self, ec):
        pass

    """"
    #####################################
                Security
    #####################################
    """

    def allowedHTTPMethods(self):
        return ['GET']

    def allowedServices(self):
        return ['query']

    def isAllowedAccess(self):
        return True

    def isAllowedAnonymmus(self):
        return False

    """"
    #####################################
                UTILS
    #####################################
    """

class AbstractAuthClass(AbstractServiceClass):pass