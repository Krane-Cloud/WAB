import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthenticateComponent } from './authenticate.component';
import { LoginComponent } from './login/login.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    AuthenticateComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticateRoutingModule,
    MatDividerModule,
    MatListModule
  ]
})
export class AuthenticateModule { }
