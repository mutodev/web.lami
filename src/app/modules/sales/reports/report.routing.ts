import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresResolver } from 'app/core/resolvers/store.resolver';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { OpenReportComponent } from './open-report/open-report.component';
import { RefundsReportComponent } from './refunds-report/refunds-report.component';
import { PaginationOrderResolver } from 'app/core/resolvers/order.resolver';

export const ReportsRoutes: Routes = [
    {
        path: 'ordenes_abiertas', component: OpenReportComponent,
        resolve:{
            orders: PaginationOrderResolver
        }
    },
    { path: 'facturas/devoluciones', component: RefundsReportComponent  },


];
