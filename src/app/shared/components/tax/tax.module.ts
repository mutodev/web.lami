import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { TaxComponent } from './tax.component';


@NgModule({
    declarations: [
        TaxComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSelectModule,
    ],
    exports: [
        TaxComponent,
    ]
})
export class TaxModule {
}
