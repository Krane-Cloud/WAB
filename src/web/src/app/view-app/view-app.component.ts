import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-view-app',
  templateUrl: './view-app.component.html',
  styleUrls: ['./view-app.component.scss']
})
export class ViewAppComponent implements OnInit {
  codeHTML=""
  codeJS=""
  
  pageID: string;
  appID: string;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private notifS: NotificationsService
  ) {
    this.pageID = String(this.route.snapshot.paramMap.get('pageID'));
    this.appID = String(this.route.snapshot.paramMap.get('appID'));
  }
  ngOnInit(): void {
  }

}
