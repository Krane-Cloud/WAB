import { NavigationEnd, Router,Event } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public drawer: any;
  public currentUrl = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.drawer.close();
  }

  public openNav() {
    this.drawer.open();
  }
  public navigate2URL(href:Array<string>){
    this.router.navigate(href)
  }

}