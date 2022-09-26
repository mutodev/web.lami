import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { PurchaseDetailComponent } from './detail/detail.component';
import { PurchaseListComponent } from './list/list.component';


export const purchaseRoutes: Routes = [
    // { path: '**', component: UserListComponent },
    { 
        path: 'all', component: PurchaseListComponent,
        resolve:{
            user: UsersResolver
        }
    },
    { path: 'new', component: PurchaseDetailComponent },
    { path: ':id', component: PurchaseDetailComponent },
    
];

