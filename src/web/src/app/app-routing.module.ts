import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateApiConnectionGuard } from './guards/validate-api-connection.guard';

const routes: Routes = [
  {path:"",component:AppComponent,children:[
    { path: 'dev',canActivate:[ValidateApiConnectionGuard], loadChildren: () => import('./dev/dev.module').then(m => m.DevModule) },
    { path: 'error', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
    {path:"",redirectTo:"dev",pathMatch:"full"},
    {path:"**",redirectTo:"error/404",pathMatch:"full"}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
