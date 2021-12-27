import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: [null,Validators.required],
    password: [null,Validators.required]
  });
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private authS :AuthenticateService
  ) {}
  ngOnInit(): void {
  }
  submit(){
    
    if(!this.loginForm.valid)return;
    const data=this.loginForm.value;

    this.authS.login(data.username,data.password)


    console.log("Login submited")
  }
}
