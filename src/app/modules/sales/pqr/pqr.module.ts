import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrDetailComponent } from './detail/detail.component';
import {PqrListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { storeRoutes } from 'app/modules/settings/store/store.routing';
import { UserInformationModule } from 'app/shared/components/user-information/user-information.module';
import { UserSecurityModule } from 'app/shared/components/user-security/user-security.module';
import { SharedModule } from 'app/shared/shared.module';
import { pqrRoutes } from './pqr.routing';



@NgModule({
  declarations: [
    PqrDetailComponent,
    PqrListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pqrRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule,
    SharedModule,
    UserSecurityModule,
    UserInformationModule
  ]
})
export class PqrModule { }
