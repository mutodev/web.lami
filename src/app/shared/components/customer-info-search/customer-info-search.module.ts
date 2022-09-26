import { NgModule } from '@angular/core';
import { SearchMatSelectModule } from 'app/shared/controls/custom-mat-select/search-mat-select.module';
import { MaterialModule } from 'app/shared/material.module';
import { CustomerInfoSearchComponent } from './customer-info-search.component';

@NgModule({
    declarations: [CustomerInfoSearchComponent],
    imports: [
        MaterialModule,
        SearchMatSelectModule,
    ],
    providers: [],
    exports: [
        CustomerInfoSearchComponent
    ]
})
export class CICustomerSearchModule { }