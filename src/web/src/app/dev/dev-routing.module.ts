import { AuthenticateGuard } from './../guards/authenticate.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevComponent } from './dev.component';
import { AddAppComponent } from './apps/add/add.component';
import { ListAppsComponent } from './apps/list/list.component';
import { EditAppComponent } from './apps/edit/edit.component';
import { EditPageComponent } from './apps/edit-page/edit-page.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule) },
  { path: '', component: DevComponent,canActivate:[AuthenticateGuard],children:[
    {path:"home",component:HomeComponent},
    {path:"apps",children:[
      {path:"add",component:AddAppComponent},
      {path:"list",component:ListAppsComponent},
      {path:"edit/:appID",component:EditAppComponent},
      {path:"edit-page/:pageID",component:EditPageComponent},
      {path:"",redirectTo:"add",pathMatch:"full"}
    ]},
    {path:"",redirectTo:"home",pathMatch:"full"}
  ] }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevRoutingModule { }
