import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ViewComponent } from './view/view.component';
import { quotationRoutes } from './quotation.routing';
import { RouterModule } from '@angular/router';
import { MaintenanceModule } from 'app/modules/maintenance/maintenance.module';
import { CompanyBrandModule } from 'app/shared/components/company-brand/company-brand.module';
import { CustomerDialogModule } from 'app/shared/components/customer-dialog/customer-dialog.module';
import { CICustomerSearchModule } from 'app/shared/components/customer-info-search/customer-info-search.module';
import { ItemsModule } from 'app/shared/components/items/items.module';
import { OrderInformationModule } from 'app/shared/components/order-information/order-information.module';
import { UserInformationModule } from 'app/shared/components/user-information/user-information.module';
import { UserSecurityModule } from 'app/shared/components/user-security/user-security.module';
import { CIViewerDocumentModule } from 'app/shared/components/viewer-document/viewer-document.module';
import { CIDateFieldModule } from 'app/shared/controls/date-field/date-field.module';
import { MaterialModule } from 'app/shared/material.module';
import { PurchaseViewComponent } from '../purchase/view/view.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    ViewComponent,
    PurchaseViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(quotationRoutes),
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
export class QuotationModule { }
