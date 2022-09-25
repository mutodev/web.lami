import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresResolver } from 'app/core/resolvers/store.resolver';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { StoreDetailComponent } from './detail/detail.component';
import { StoreListComponent } from './list/list.component';

export const storeRoutes: Routes = [
    { 
        path: 'all', component: StoreListComponent,
        resolve:{
            user: StoresResolver
        }
    },
    { path: 'new', component: StoreDetailComponent },
    { path: ':id', component: StoreDetailComponent },
   
    
];

