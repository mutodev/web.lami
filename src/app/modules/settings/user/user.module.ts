import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routing';
import { UserDetailComponent } from './detail/detail.component';
import { UserListComponent } from './list/list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UserSecurityModule } from 'app/shared/components/user-security/user-security.module';
import { UserInformationModule } from 'app/shared/components/user-information/user-information.module';
import { FuseAlertModule } from '@fuse/components/alert';

@NgModule({
    declarations: [
        UserDetailComponent, 
        UserListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
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
        UserInformationModule,
        FuseAlertModule
    ],
    exports: [],
    providers: [],
})
export class UserModule { }