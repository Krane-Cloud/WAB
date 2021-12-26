class WebUtil:
    @staticmethod
    def getParamValue(request, paramName:str, mandatory:bool=False, defaultValue=None):
        if request.method == 'POST' or request.method == 'PUT':
            if (paramName not in request.POST and mandatory):
                raise ValueError("Missing mandatory parameter "+paramName)
            if paramName.lower() in request.POST:
                v = request.POST[paramName.lower()]
            if paramName.upper() in request.POST:
                v = request.POST[paramName.upper()]
            else:
                v=request.POST.get(paramName)
            if (v is None and mandatory ):
                v = defaultValue
        elif request.method == 'GET':
            if (paramName not in request.GET and mandatory):
                raise ValueError("Missing mandatory parameter "+paramName)            
            if paramName.lower() in request.POST:
                v = request.POST[paramName.lower()]
            if paramName.upper() in request.POST:
                v = request.POST[paramName.upper()]
            else:
                v=request.GET.get(paramName)
            if (v is None and mandatory ):
                v = defaultValue
        return v
    @staticmethod
    def getParamsValue(request,paramNames:list,mandatory:bool,defaultValue=None) -> dict:
        js={}
        for param in paramNames:
            js[param]=WebUtil.getParamValue(request,param,mandatory,defaultValue)
        return js