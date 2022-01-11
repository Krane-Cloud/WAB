import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'view-app-render-code',
  templateUrl: './render-code.component.html',
  styleUrls: ['./render-code.component.scss']
})
export class RenderCodeComponent implements OnInit {
  codeHTML=""
  codeJS=""
  isOK=true;
  @Input() appID!: string;
  @Input() pageID!: string;
  constructor(
    private notifS:NotificationsService,
    private http:HttpClient
  ) { 

  }

  ngOnInit(): void {
    if(this.appID==undefined || this.pageID==undefined)
      this.isOK=false;
    if(this.isOK){
      this.fetchPageCode();
      
    }
  }

  fetchPageCode(){
    const formData = new FormData();
    console.log();
    
    // formData.append('pageID', this.pageID);
    // formData.append('appID', this.appID);
    this.http
      .get(`${environment.api_routes.get_page_details}?appID=${this.appID.replace("-","")}&pageID=${this.pageID.replace("-","")}`, {
        withCredentials: true,
      })
      .toPromise()
      .then((response: any) => {
        this.codeHTML += response.data.htmlCode;
        this.codeJS += response.data.jsCode;
        eval(this.codeJS);
      })
      .catch((error) => {
        let errors: string = '';
        for (let i in error.error.errors) errors += `${error.error.errors[i]}`;

        this.notifS.sendDanger(errors);
      });
  }
  

}
