import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresResolver } from 'app/core/resolvers/store.resolver';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

export const BrillaRoutes: Routes = [
    {
        path: 'all', component: ListComponent,
        resolve:{
            user: StoresResolver
        }
    },
    { path: 'new', component: DetailComponent },
    { path: ':id', component:DetailComponent },


];
