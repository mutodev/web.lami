import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
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
import { UserInformationModule } from 'app/shared/components/user-information/user-information.module';
import { UserSecurityModule } from 'app/shared/components/user-security/user-security.module';
import { SharedModule } from 'app/shared/shared.module';
import { ReportsRoutes } from './report.routing';
import { OpenReportComponent } from './open-report/open-report.component';
import { RefundsReportComponent } from './refunds-report/refunds-report.component';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    OpenReportComponent,
    RefundsReportComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(ReportsRoutes),
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
  ], exports: [],
  providers: [


    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ReportsModule { }
