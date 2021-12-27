import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  constructor(
    private authS: AuthenticateService,
    private router: Router,
    private notif: NotificationsService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authS.isAuthenticated().then((response) => {
      if (response == false) {
        this.notif.sendWarning(
          'You need to be authenticated in order to access this page!'
        );
        this.router.navigate(['dev', 'auth']);
        return false;
      }
      return true;
    });
  }
}
