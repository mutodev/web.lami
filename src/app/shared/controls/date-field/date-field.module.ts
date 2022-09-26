import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/shared/material.module';
import { CIDateFieldComponent } from './date-field.component';


@NgModule({
    declarations: [CIDateFieldComponent],
    imports: [
        MaterialModule
    ],
    providers: [],
    exports: [
        CIDateFieldComponent
    ]
})
export class CIDateFieldModule { }