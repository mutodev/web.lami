import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteResolver, PaginationQuoteResolver } from 'app/core/resolvers/quotation.resolver';
import { PaginationProductResolver, ProductsResolver } from 'app/core/resolvers/product.resolver';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { CustomersResolver, PaginationClientsResolver, } from 'app/modules/contact/customer/clients.resolver';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';


export const quotationRoutes: Routes = [
    // { path: '**', component: UserListComponent },
    {
        path: 'all', component: ListComponent,
         resolve: {
            orders: PaginationQuoteResolver
         }
    },
    {
        path: 'new', component: DetailComponent,
        // resolve: {
        //     paginateCustomers: PaginationClientsResolver,
        //     customers:CustomersResolver,
        //     products: PaginationProductResolver

        // }
    },
    {
        path: 'edit/:id', component: DetailComponent,
        // resolve: {
        //     order: QuoteResolver,
        //     customers:CustomersResolver,
        //     products: ProductsResolver
        // }
    },
    {
        path: 'view/:id',
        component : ViewComponent,
        resolve: {
           quote: QuoteResolver
        }
    },

];

