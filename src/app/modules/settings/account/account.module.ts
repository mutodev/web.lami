import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SecurityComponent } from './security/security.component';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { accountRoutes } from './account.routing';
import { ProfileComponent } from './profile/profile.component';
import { UserSecurityModule } from 'app/shared/components/user-security/user-security.module';

@NgModule({
    declarations: [
        SecurityComponent,
        AccountComponent,
        ProfileComponent
    ],
    imports: [ CommonModule,
        RouterModule.forChild(accountRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        UserSecurityModule,
        SharedModule ],
    exports: [],
    providers: [],
})
export class AccountModule {}