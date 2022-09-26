import { NgModule } from '@angular/core';
import { SearchMatSelectModule } from 'app/shared/controls/custom-mat-select/search-mat-select.module';
import { SelectMultiColumnsModule } from 'app/shared/controls/select-multi-columns/select-multi-columns.module';
import { MaterialModule } from 'app/shared/material.module';
import { TaxModule } from '../tax/tax.module';
import { ItemsComponent } from './items.component';

@NgModule({
    declarations: [ItemsComponent],
    imports: [
        MaterialModule,
        SelectMultiColumnsModule,
        SearchMatSelectModule,
        TaxModule
    ],
    providers: [],
    bootstrap: [ItemsComponent],
    exports: [
        ItemsComponent
    ]
})
export class ItemsModule { }