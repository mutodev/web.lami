import { NgModule } from '@angular/core';
import { SearchMatSelectModule } from 'app/shared/controls/custom-mat-select/search-mat-select.module';
import { SelectMultiColumnsModule } from 'app/shared/controls/select-multi-columns/select-multi-columns.module';
import { MaterialModule } from 'app/shared/material.module';
import { CustomerDialogModule } from '../customer-dialog/customer-dialog.module';
import { CustomerInfoSearchComponent } from './customer-info-search.component';

@NgModule({
    declarations: [CustomerInfoSearchComponent],
    imports: [
        MaterialModule,
        SearchMatSelectModule,
        CustomerDialogModule,
        SelectMultiColumnsModule
    ],
    providers: [],
    exports: [
        CustomerInfoSearchComponent
    ]
})
export class CICustomerSearchModule { }