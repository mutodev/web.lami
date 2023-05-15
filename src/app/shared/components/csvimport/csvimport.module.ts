import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvimportComponent } from './csvimport.component';
import { csvRoutes } from './csvimport.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CsvimportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(csvRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,


  ]
})
export class CsvimportModule { }
