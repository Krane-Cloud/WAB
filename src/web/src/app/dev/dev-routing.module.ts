import { AuthenticateGuard } from './../guards/authenticate.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevComponent } from './dev.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule) },
  { path: '', component: DevComponent,canActivate:[AuthenticateGuard],children:[
    {path:"home",component:HomeComponent},
    {path:"",redirectTo:"home",pathMatch:"full"}
  ] }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevRoutingModule { }
