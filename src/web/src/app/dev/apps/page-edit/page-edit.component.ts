import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {
  editorOptionsJS = {theme: 'vs-light', language: 'javascript'};
  editorOptionsHTML = {theme: 'vs-light', language: 'html'};
  codeJS: string= '//JavaScript editor \n';
  codeHTML: string= '<!-- HTML Editor -->\n';
  hasAccess=true;

  pageID:string;
  appID:string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private notifS:NotificationsService
    
  ) {
    this.pageID = String(this.route.snapshot.paramMap.get('pageID'));
    this.appID = String(this.route.snapshot.paramMap.get('appID'));
  }

  ngOnInit(): void {
    this.validate_access()
    if(this.hasAccess){
        this.fetchCode()
    }
  }

  validate_access(){
    const formData= new FormData()

    formData.append('pageID',this.pageID)
    formData.append('appID',this.appID)

    this.http.post(environment.api_routes.validate_access_page, formData,{withCredentials:true})
    .toPromise()
    .then(
      (response:any)=>{
        console.log(response);
        
        if (response.data.access_guard != 'true') 
          this.hasAccess = false;
      }
    )
  }

  save_code(){
    console.log(this.codeHTML);
    console.log(this.codeJS);

    const formData= new FormData()
    formData.append("appID",String(this.appID))
    formData.append("pageID",String(this.pageID))
    
    const final_htmlCode :string=String(this.codeHTML).replace("<!-- HTML Editor -->",""),
          final_js :string=String(this.codeJS).replace("//JavaScript editor ","")

    formData.append("htmlCode",final_htmlCode)
    formData.append("jsCode",final_js)

    this.http.post(environment.api_routes.save_page,formData,{withCredentials:true})
    .toPromise()
    .then(
      (response:any)=>{
        // this.codeHTML=response.data.htmlCode ?? "<!-- HTML -->"
        // this.codeJS=response.data.jsCode ?? "//JS"
        
        this.notifS.sendSuccess(response.message);

      }
    ).catch(
      (error:any)=>{
        let errors: string = '';
        for (let i in error.error.errors) errors += `${error.error.errors[i]}`;

        this.notifS.sendDanger(errors);
      }
    )
  }
  async fetchCode(){
    const formData= new FormData()

    formData.append('pageID',this.pageID)
    formData.append('appID',this.appID)
    this.http.post(`${environment.api_routes.get_page_details}`,formData,{withCredentials:true})
    .toPromise()
    .then(
      (response:any)=>{
        console.log(response);
        this.codeHTML+=response.data.htmlCode  
        this.codeJS+=response.data.jsCode 
        
      }
    ).catch(
      (error)=>{
        let errors: string = '';
        for (let i in error.error.errors) errors += `${error.error.errors[i]}`;

        this.notifS.sendDanger(errors);
      }
    )
  }

}
