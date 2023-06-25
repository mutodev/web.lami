import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { purchaseRoutes } from './purchase.routing';
import { UserSecurityModule } from 'app/shared/components/user-security/user-security.module';
import { UserInformationModule } from 'app/shared/components/user-information/user-information.module';
import { PurchaseDetailComponent } from './detail/detail.component';
import { PurchaseListComponent } from './list/list.component';
import { MaterialModule } from 'app/shared/material.module';
import { CIDateFieldModule } from 'app/shared/controls/date-field/date-field.module';
import { CompanyBrandModule } from 'app/shared/components/company-brand/company-brand.module';
import { CICustomerSearchModule } from 'app/shared/components/customer-info-search/customer-info-search.module';
import { ItemsModule } from 'app/shared/components/items/items.module';
import { OrderInformationModule } from 'app/shared/components/order-information/order-information.module';
import { CustomerDialogModule } from 'app/shared/components/customer-dialog/customer-dialog.module';
import { MaintenanceModule } from 'app/modules/maintenance/maintenance.module';
import { OrderStatusPipe } from 'app/core/pipes/order-status.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { CIViewerDocumentModule } from 'app/shared/components/viewer-document/viewer-document.module';
import { PurchaseViewComponent } from './view/view.component';


@NgModule({
    declarations: [
        PurchaseDetailComponent,
        PurchaseListComponent,
        OrderStatusPipe
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
        ItemsModule,
        OrderInformationModule,
        CustomerDialogModule,
         MaintenanceModule,
         CIViewerDocumentModule
    ],
    exports: [],
    providers: [],
})
export class PurchaseModule { }