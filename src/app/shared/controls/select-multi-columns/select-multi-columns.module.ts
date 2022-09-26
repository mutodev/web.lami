import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMultiColumnsComponent } from './select-multi-columns.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    SelectMultiColumnsComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatIconModule
  ],
  exports: [SelectMultiColumnsComponent],
  entryComponents: [SelectMultiColumnsComponent]
})
export class SelectMultiColumnsModule { }
