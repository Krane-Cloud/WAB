import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPagesComponent } from './error-pages.component';
import { InternalerrorComponent } from './internalerror/internalerror.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [ { path: '', component: ErrorPagesComponent,children:[
  {path:"404",component:NotfoundComponent},
  {path:"500",component:InternalerrorComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule { }
