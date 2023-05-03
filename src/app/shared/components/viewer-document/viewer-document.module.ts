import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/shared/material.module';
import { CompanyBrandModule } from '../company-brand/company-brand.module';
import { CIViewerDocumentComponent } from './viewer-document.component';


@NgModule({
    declarations: [CIViewerDocumentComponent],
    imports: [
        MaterialModule,
        CompanyBrandModule
    ],
    providers: [],
    exports: [
        CIViewerDocumentComponent,
    ]
})
export class CIViewerDocumentModule { }