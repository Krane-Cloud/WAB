import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditAppComponent implements OnInit {
  appID: string;
  appMainSettings:any={name:""};

  editMainAppSettingsForm = this.formBuilder.group({
    name: [null, Validators.required],

  });




  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private notifS: NotificationsService,
    private formBuilder: FormBuilder,
  ) {
    this.appID = String(this.route.snapshot.paramMap.get('appID'));
  }

  hasAccess = true;

  ngOnInit(): void {
    this.validateAccess(this.appID);
    if (this.hasAccess) {
      this.fetchMainSettings(this.appID);
      this.fetchPages(this.appID);
    }
  }

  validateAccess(appID: string) {
    const formData = new FormData();
    formData.append('appID', appID);

    this.http
      .post(environment.api_routes.validate_access_app, formData, {
        withCredentials: true,
      })
      .toPromise()
      .then((response: any) => {
        if (response.data.access_guard != 'true') {
          this.hasAccess = false;
        }
      })
      .catch((error) => {
        this.hasAccess = false;
        let errors: string = '';
        for (let i in error.error.errors) errors += `${error.error.errors[i]}`;

        this.notifS.sendDanger(errors);
      });
  }

  async fetchMainSettings(appID: string) {
    const formData = new FormData();
    formData.append('appID', appID);

    this.http.post(environment.api_routes.get_apps,formData,{withCredentials:true})
    .toPromise()
    .then(
      (response:any)=>
        this.appMainSettings=response.data[0]

      
    )
  }
  async fetchPages(appID: string) {}

  async editMainAppSettings() {}
}
