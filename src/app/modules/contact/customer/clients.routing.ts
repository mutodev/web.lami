import { Routes, RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientsResolver } from './clients.resolver';
import { CustomerListComponent } from './list/list.component';
import { CustomerDetailsComponent } from './details/details.component';


export const routes: Route[] = [
    
        {
            path: 'all',
            component: CustomerListComponent,
            // resolve: {
            //     products: ClientsResolver,
            // }
        },
        {
            path: 'edit/:id',
            component: CustomerDetailsComponent,
        },
        {
            path: 'new',
            component: CustomerDetailsComponent,
        }
]

