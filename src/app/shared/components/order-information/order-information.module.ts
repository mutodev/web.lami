import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInformationComponent } from './order-information.component';
import { CIDateFieldModule } from 'app/shared/controls/date-field/date-field.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SearchMatSelectModule } from 'app/shared/controls/custom-mat-select-new/search-mat-select.module';
import { SelectMultiColumnsModule } from 'app/shared/controls/select-multi-columns/select-multi-columns.module';
import { MaterialModule } from 'app/shared/material.module';

@NgModule({
    declarations: [OrderInformationComponent],
    imports: [ CommonModule,
        MatSelectModule,
        MaterialModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        SearchMatSelectModule,
        SelectMultiColumnsModule,
        CIDateFieldModule ],
    exports: [OrderInformationComponent],
    providers: [],
})
export class OrderInformationModule {}