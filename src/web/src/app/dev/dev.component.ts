import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {
  public user:any={};
  constructor(private http:HttpClient) { }

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
