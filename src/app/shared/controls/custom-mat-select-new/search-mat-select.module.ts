import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchMatSelectComponent } from './search-mat-select.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    SearchMatSelectComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule
  ],
  exports: [SearchMatSelectComponent],
  entryComponents: [SearchMatSelectComponent]
})
export class SearchMatSelectModule { }
