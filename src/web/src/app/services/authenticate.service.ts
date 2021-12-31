import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notif: NotificationsService
  ) {}
  async login(username: string, password: string) {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    await this.http
      .post(environment.api_routes.login, data, { withCredentials: true })
      .subscribe((response: any) => {
        if (response.status == 'OK') {
          this.notif.sendSuccess(response.message);
          this.router.navigate(['dev']);
        } else {
          this.notif.sendWarning(response.message);
        }
      });
  }

  async isAuthenticated() {
    let r: any;

    await this.http
      .get(environment.api_routes.isAuthenticated, { withCredentials: true })
      .toPromise()
      .then((data: any) => (r = data.data.authenticated));
    if (r == 'false') return false;
    else return true;
  }


  async validateConnection(){
    let r: any;

    await this.http
      .get(environment.api_routes.validateCon, { withCredentials: true })
      .toPromise()
      .then(() => (r = true))
      .catch(()=>(r=false))
      ;
    return r;
  }
}
