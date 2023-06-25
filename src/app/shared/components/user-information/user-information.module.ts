import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { UserInformationComponent } from './user-information.component';
import { SearchMatSelectModule } from 'app/shared/controls/custom-mat-select-new/search-mat-select.module';

@NgModule({
    declarations: [UserInformationComponent],
    imports: [ CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTooltipModule,
        SharedModule,
        SearchMatSelectModule
     ],
    exports: [UserInformationComponent],
    providers: [],
})
export class UserInformationModule {}