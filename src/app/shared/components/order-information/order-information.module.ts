import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInformationComponent } from './order-information.component';
import { CIDateFieldModule } from 'app/shared/controls/date-field/date-field.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [OrderInformationComponent],
    imports: [ CommonModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        CIDateFieldModule ],
    exports: [OrderInformationComponent],
    providers: [],
})
export class OrderInformationModule {}