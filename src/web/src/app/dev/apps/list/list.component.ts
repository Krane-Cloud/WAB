import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListAppsComponent implements OnInit {
  displayedColumns: string[] = ['name',"username", 'added_on',"wab_version","available",  'ops'];
  dataSource:any[] = [];
  constructor(private http: HttpClient,private notifS:NotificationsService) { }

  ngOnInit(): void {
    this.fetchApps()
  }


  fetchApps(){
    this.http.get(environment.api_routes.get_apps,{withCredentials:true})
    .toPromise().then((data:any)=>{
        this.dataSource=data.data
        
    }).catch(
      (error:any)=>{
        let errors:string=""
        for(let i in error.error.errors)
          errors+=`${error.error.errors[i]}`
        this.notifS.sendDanger(errors)
      }
      
    )
  }
  delete_app(appID:string){
    let app:any;
    for(let i in this.dataSource){
      
      if(this.dataSource[i].id==appID)
        app=this.dataSource[i];
    }

    if(confirm(`Are you sure you want to delete ${app.name}?`)){
      const formData= new FormData()


      

      formData.append('appID',String(app.id))

      console.log(formData.get("appID"));
      

      this.http.post(environment.api_routes.remove_app,formData,{withCredentials:true})
      .toPromise()
      .then(
        (response:any)=>{
          this.notifS.sendSuccess(response.message)
          
          // removes the app from the datasource list
          let newDS:any[]=[]; 
          for(let i in this.dataSource)
            if(this.dataSource[i].id!=app.id)
              newDS.push(this.dataSource[i]);
          
          this.dataSource=newDS
        
        }
      ).catch(
        (error)=>{
        let errors:string=""
        for(let i in error.error.errors)
          errors+=`${error.error.errors[i]}`

        this.notifS.sendDanger(errors)
        }
      )
    }


  }
}
