import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationTree } from '../models/navigations';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  public loading:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);



  currentMainLinks:NavigationTree[]=[
    {
      name:'Home',
      icon:'dashboard',
      href:['dashboard'],
      tooltip:'Dashboard Home',
    },
  
    {
      name:'Servers',
      icon:'dns',
      href:['dashboard','servers'],
      tooltip:'Servers Menu',
      // children:this.serversLink
    },
    {
      name:'Install',
      icon:'downloading',
      href:['dashboard','install'],
      tooltip:'Install an application on a server',
      // children:this.serversLink
    },
    {
      name:'Aplications Installed',
      icon:'analytics',
      href:['dashboard','apps_installed'],
      tooltip:'See installed apps',
      // children:this.serversLink
    },
  ]
  constructor() { }
}