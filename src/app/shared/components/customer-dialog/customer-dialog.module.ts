import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDialogComponent } from './customer-dialog.component';
import { CustomerModule } from '../customer/customer.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
    declarations: [
        CustomerDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        CustomerModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    exports: [CustomerDialogComponent],
    providers: [],
})
export class CustomerDialogModule { }
