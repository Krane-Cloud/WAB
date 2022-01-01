import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageEditRoutingModule } from './page-edit-routing.module';
import { PageEditComponent } from './page-edit.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 

import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  declarations: [
    PageEditComponent
  ],
  imports: [
    CommonModule,
    PageEditRoutingModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule
  ]
})
export class PageEditModule { }
