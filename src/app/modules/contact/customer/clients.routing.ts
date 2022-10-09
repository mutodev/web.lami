import { Routes, RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientResolver, ClientsResolver } from './clients.resolver';
import { CustomerListComponent } from './list/list.component';
import { CustomerDetailsComponent } from './details/details.component';
import { IdentificationTypesResolver } from 'app/core/resolvers/types.resolver';


export const routes: Route[] = [
    
        {
            path: 'all',
            component: CustomerListComponent,
            resolve: {
                customers: ClientsResolver,
                identficationtypes: IdentificationTypesResolver,

            }
        },
        {
            path: 'edit/:id',
            component: CustomerDetailsComponent,
            resolve: {
                identficationtypes: IdentificationTypesResolver,
                customers: ClientResolver,

            }
        },
        {
            path: 'new',
            component: CustomerDetailsComponent,
            resolve: {
                identficationtypes: IdentificationTypesResolver,
                customers: ClientResolver,

            }
        }
]

