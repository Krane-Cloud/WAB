from django.http import JsonResponse
import logging as log, traceback, sys

class ServiceController:
    @staticmethod
    def index(request,pkg:str,service:str,action:str):
        try:
            instanceService=ServiceController.getSeviceInstance(pkg,service)(request)
        except Exception as err:
            log.info(err)
            traceback.print_exc(file=sys.stdout)
            data={'message':"An error appeared when trying to access the API","error":str(err)}
            code=500
            return JsonResponse(data,status=code,safe=False)

        try:
            if request.method not in instanceService.allowedHTTPMethods():
                raise ConnectionError('Method not allowed!')
            if action.lower() not in instanceService.allowedServices():
                raise PermissionError('Service not allowed!')
            msg,code=instanceService.validateSecurity()
            if code > 0:
                raise PermissionError(msg)
            fnc=getattr(instanceService,action)
            data,code= fnc()
        except AttributeError:
            data={'message':"ERR","error":f"Unreconized action!"}
            code=400
        except PermissionError as err:
            data={'message':"ERR","error":str(err)}
            code=403
        except ConnectionError as err:
            data={'message':"ERR","error":str(err)}
            code=405
        except Exception as err:
            log.info(err)
            traceback.print_exc(file=sys.stdout)
            data={'message':"ERR","error":str(err)}
            code=500
        return JsonResponse(data,status=code,safe=False)

    @staticmethod
    def getSeviceInstance(pkg:str,service:str):
        pkgName=pkg.lower()
        serviceName=service.lower().capitalize()
        module=__import__(f'apis.services.{pkgName}.{serviceName}')
        pkgS=getattr(module,'services')
        pkg=getattr(pkgS,pkgName)
        pyfile=getattr(pkg,serviceName)
        cls=getattr(pyfile,serviceName)
        return cls