import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAppRoutingModule } from './view-app-routing.module';
import { ViewAppComponent } from './view-app.component';
import { RenderCodeComponent } from './render-code/render-code.component';


@NgModule({
  declarations: [
    ViewAppComponent,
    RenderCodeComponent
  ],
  imports: [
    CommonModule,
    ViewAppRoutingModule
  ]
})
export class ViewAppModule { }
