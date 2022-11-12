import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'app/shared/material.module';
import { SearchProductDialogComponent } from './search-product-dialog.component';

@NgModule({
    declarations: [ SearchProductDialogComponent ],
    imports: [ 
        BrowserModule,
        MaterialModule, 
    MatDialogModule],
    exports: [ SearchProductDialogComponent ],
    providers: [],
})
export class SearchProductModule {}