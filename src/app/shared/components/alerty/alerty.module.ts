import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertyComponent } from './alerty.component';
import { FuseAlertModule } from '@fuse/components/alert';

@NgModule({
    declarations: [AlertyComponent],
    imports: [ CommonModule,
    FuseAlertModule ],
    exports: [AlertyComponent],
    providers: [],
})
export class AlertyModule {}