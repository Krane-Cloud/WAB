import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { map, shareReplay } from 'rxjs/operators';
import { NavigationTree } from '../models/navigations';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { VariablesService } from '../services/variables.service';
@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {
  public user:any={};
  public navItems: NavigationTree[];

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private http:HttpClient,private breakpointObserver: BreakpointObserver,private varS:VariablesService) { 
    this.navItems=varS.currentMainLinks
  }

  ngOnInit(): void {
    this.fetchUserData()
  }


  fetchUserData(){
    this.http.get(environment.api_routes.getUserData,{withCredentials:true}).subscribe(
      (data:any)=> 
        this.user=data.data
    )
  }

}
