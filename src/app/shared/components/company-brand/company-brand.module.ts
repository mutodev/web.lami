import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CompanyBrandComponent } from './company-brand.component';


@NgModule({
    declarations: [CompanyBrandComponent],
    imports: [],
    providers: [],
    bootstrap: [CompanyBrandComponent],
    exports: [
        CompanyBrandComponent
    ]
})
export class CompanyBrandModule { }