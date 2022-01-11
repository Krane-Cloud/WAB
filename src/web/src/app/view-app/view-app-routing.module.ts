import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAppComponent } from './view-app.component';

const routes: Routes = [{ path: ':appID/:pageID', component: ViewAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAppRoutingModule { }
