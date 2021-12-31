import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateApiConnectionGuard implements CanActivate {
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
    return this.authS.validateConnection().then((response) => {
      if (response == false) {
        this.notif.sendWarning(
          'An error has occured while calling the API!'
        );
        this.router.navigate(['error', '500']);
        return false;
      }
      return true;
    });
  
}
}