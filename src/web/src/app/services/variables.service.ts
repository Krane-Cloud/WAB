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
      icon:'home',
      href:['dev'],
      tooltip:'Dashboard Home',
    },
  
    {
      name:'Applications',
      icon:'dns',
      href:['dev','apps'],
      tooltip:'Applications Menu',
      children:[
        {name:"Create application",icon:"add",href:["dev","apps,","create"]},
        {name:"View applications",icon:"menu_open",href:["dev","apps,","create"]}
      ]
    },
    {
      name:'Manage Files',
      icon:'cloud_upload',
      href:['dev','apps'],
      tooltip:'Servers Menu',
    }
  ]
  constructor() { }
}