import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { ErrorPagesComponent } from './error-pages.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InternalerrorComponent } from './internalerror/internalerror.component';


@NgModule({
  declarations: [
    ErrorPagesComponent,
    NotfoundComponent,
    InternalerrorComponent
  ],
  imports: [
    CommonModule,
    ErrorPagesRoutingModule
  ]
})
export class ErrorPagesModule { }
