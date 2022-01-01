import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditAppComponent implements OnInit,AfterViewInit {
  appID: string;
  appMainSettings:any={name:""};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pagesdisplayedColumns: string[] = ["page_id",'name', 'added_on',"available",  'ops'];
  pagesData:any[] = [];
  pagesDatasource=new MatTableDataSource(this.pagesData);

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



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pagesDatasource.filter = filterValue.trim().toLowerCase();

    if (this.pagesDatasource.paginator) {
      this.pagesDatasource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.validateAccess(this.appID);
    if (this.hasAccess) {
      this.fetchMainSettings(this.appID);
      this.fetchPages(this.appID);
    }
  }
  ngAfterViewInit() {
    this.pagesDatasource.paginator = this.paginator;
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
  async fetchPages(appID: string) {
    this.http.get(`${environment.api_routes.get_pages}?appID=${appID}`,{withCredentials:true})
    .toPromise()
    .then(
      (response:any)=>{
        this.pagesDatasource.data=response.data
        
      }
    )


  }

  async editMainAppSettings() {}
}
