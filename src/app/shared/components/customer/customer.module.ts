import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SearchMatSelectModule } from 'app/shared/controls/custom-mat-select-new/search-mat-select.module';
import { CustomerComponent } from './customer.component';


@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSelectModule,
        SearchMatSelectModule,
        MatDividerModule
    ],
    exports: [
        CustomerComponent,
    ]
})
export class CustomerModule {
}
