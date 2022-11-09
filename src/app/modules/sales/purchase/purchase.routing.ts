import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderResolver, PaginationOrderResolver } from 'app/core/resolvers/order.resolver';
import { PaginationProductResolver, ProductsResolver } from 'app/core/resolvers/product.resolver';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { CustomersResolver, PaginationClientsResolver } from 'app/modules/contact/customer/clients.resolver';
import { PurchaseDetailComponent } from './detail/detail.component';
import { PurchaseListComponent } from './list/list.component';
import { PurchaseViewComponent } from './view/view.component';


export const purchaseRoutes: Routes = [
    // { path: '**', component: UserListComponent },
    {
        path: 'all', component: PurchaseListComponent,
        resolve: {
            orders: PaginationOrderResolver
        }
    },
    {
        path: 'new', component: PurchaseDetailComponent,
        resolve: {
            paginateCustomers: PaginationClientsResolver,
            customers:CustomersResolver,
            products: PaginationProductResolver

        }
    },
    { 
        path: 'edit/:id', component: PurchaseDetailComponent,
        resolve: {
            order: OrderResolver,
            customers:CustomersResolver,
            products: ProductsResolver
        }
    },
    { 
        path: 'view/:id',
        component : PurchaseViewComponent,
        resolve: {
            order: OrderResolver
        }
    },

];

