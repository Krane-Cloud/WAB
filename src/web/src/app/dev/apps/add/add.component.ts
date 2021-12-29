import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddAppComponent implements OnInit {
  hide=true;
  submitForm = this.formBuilder.group({
    name: [null,Validators.required],
    type_of_app: [null,Validators.required]
  });

  acceptedAppTypes=[
    {name:"Empty",value:"EMPTY",icon:"check_box_outline_blank"}
  ]

  constructor( private formBuilder: FormBuilder,private http: HttpClient, private notifS:NotificationsService) { }

  ngOnInit(): void {
  }
  submit(){
    if(this.submitForm.invalid)return;
    const data=this.submitForm.value
    const formData=new FormData()
    formData.append("name",data.name)
    formData.append("type_of_app",data.type_of_app)

    this.http.post(environment.api_routes.add_app,formData,{withCredentials:true}).toPromise().then(
      (data:any)=>{
        this.notifS.sendSuccess(data.message)


      }
    ).catch(
      (error:any)=>{
        // console.log(error.error);
        let errors:string=""
        for(let i in error.error.errors)
          errors+=`${error.error.errors[i]}`
        this.notifS.sendDanger(errors)
      }
    )
  }
}
