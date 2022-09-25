import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersResolver } from 'app/core/resolvers/user.resolver';
import { UserDetailComponent } from './detail/detail.component';
import { UserListComponent } from './list/list.component';

export const userRoutes: Routes = [
    // { path: '**', component: UserListComponent },
    { 
        path: 'all', component: UserListComponent,
        resolve:{
            user: UsersResolver
        }
    },
    { path: 'new', component: UserDetailComponent },
    { path: ':id', component: UserDetailComponent },
    
];

