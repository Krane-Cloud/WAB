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
  codeJS: string= 'function x() {\nconsole.log("Hello world!");\n}';
  codeHTML: string= '<h1>Hello World</h1>';
  hasAccess=true;

  pageID:string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    
  ) {
    this.pageID = String(this.route.snapshot.paramMap.get('pageID'));
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

    this.http.post(environment.api_routes.validate_access_page, formData,{withCredentials:true})
    .toPromise()
    .then(
      (response:any)=>{
        if (response.data.access_guard != 'true') 
          this.hasAccess = false;
      }
    )
  }


  save_code(){
    console.log(this.codeHTML);
    console.log(this.codeJS);
    
  }
  async fetchCode(){

  }

}
