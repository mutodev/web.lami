import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { purchaseRoutes } from './purchase.routing';
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
import { PurchaseDetailComponent } from './detail/detail.component';
import { PurchaseListComponent } from './list/list.component';
import { MaterialModule } from 'app/shared/material.module';
import { CIDateFieldModule } from 'app/shared/controls/date-field/date-field.module';
import { CompanyBrandModule } from 'app/shared/components/company-brand/company-brand.module';
import { CICustomerSearchModule } from 'app/shared/components/customer-info-search/customer-info-search.module';
import { ItemsModule } from 'app/shared/components/items/items.module';

@NgModule({
    declarations: [
        PurchaseDetailComponent, 
        PurchaseListComponent
        ],
    imports: [
        CommonModule,
        RouterModule.forChild(purchaseRoutes),
        MaterialModule,
        UserSecurityModule,
        UserInformationModule,
        CIDateFieldModule,
        CompanyBrandModule,
        CICustomerSearchModule,
        ItemsModule
    ],
    exports: [],
    providers: [],
})
export class PurchaseModule { }