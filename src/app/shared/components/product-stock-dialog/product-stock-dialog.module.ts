import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStockDialogComponent } from './product-stock-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'app/shared/material.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ProductStockDialogComponent
  ],
  imports: [
    MaterialModule,
    MatDialogModule
  ],
  bootstrap: [ProductStockDialogComponent],
  exports: [ProductStockDialogComponent]
})
export class ProductStockDialogModule { }
